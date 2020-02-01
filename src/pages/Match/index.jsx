import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../utils/firebase.js';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faEdit } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { startMatching, joinMatchedRoom, deleteRoomNoRedirect } from '../../actions';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';
import LoadingModal from '../../components/LoadingModal';
import MatchModal from './MatchModal';
import connectingImg from '../../assets/img/connecting.svg';
import loadingImg from '../../assets/img/loading.gif';
import joiningImg from '../../assets/img/joining.svg';

class Match extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('ready');
    this.unsubscribe = null;
    this.state = {
      errors: {},
      pairs: [],
      inPairs: false,
      roomName: '',
      modalShow: true,
    }
    this.curHandle = props.username;
    this.onUpdatePairs = this.onUpdatePairs.bind(this);
  }
  onUpdatePairs = (snapshot) => {
    // console.log(this.curHandle);
    const pairs = [];
    snapshot.forEach((doc) => {
      pairs.push({
        handle: doc.data().handle,
        room: doc.data().room,
      })
    });
    this.setState({
      pairs
    }, (() => {
      // console.log(this.curHandle);

    }).bind(this));
  }
  handleClick = () => {
    // console.log('button clicked')
    // this.setState({
    //   matching: true
    // })
    this.props.startMatching();
  }
  handleJoinRoom = () => {
    // console.log(history);
    // console.log(this.state.roomName);
    this.props.joinMatchedRoom(this.state.roomName, this.props.history);
  }
  setModalShow = (bool) => {
    this.setState({
      modalShow: bool
    })
  }
  deleteOwnsRoom = (roomName) => {
    this.props.deleteRoomNoRedirect(roomName);
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onUpdatePairs);
  }
  componentDidUpdate(prevProps, prevState) {
    if(!prevState.inPairs && this.props.username) {
      for(let i = 0, len = this.state.pairs.length; i < len; i++) {
        if(this.state.pairs[i].handle === this.props.username) {
          this.setState({
            inPairs: true,
            roomName: this.state.pairs[i].room
          })
        }
      }
    }
  }
  render(){
    const { errors, inPairs } = this.state;
    const { loading, success } = this.props.UI;
    const { matching, ownsRoom } = this.props;
    const showModal = ownsRoom && ownsRoom.length > 0;
    // console.log(this.curHandle);
    // console.log(this.state.pairs);
    console.log(this.state.inPairs);
    const notReady = (
      <div className="not-ready-container">
        {
          matching
          ?
          <div className="waiting-container">
            <img src={loadingImg} alt="loading" />
            <p>
              Pomopal is working hard to connect you with another sould. If you have waited for long time, you can also try to create a new room and invite your friend.
            </p>
            <Button variant="info">
              Matching...
            </Button>
          </div>
          :
          <div className="matching-container">
            <img src={connectingImg} alt="connecting" />
            <p>
              Pomopal will connect you with another user who wants to start a pomodoro at this moment...
            </p>
            <div>
              <Button variant="info"
                      onClick={() => this.handleClick()}>
                Match
              </Button>
            </div>
          </div>
        }
      </div>
    )
    return(
      <div className="match-container">
        <NavbarTop />
        {
          inPairs
          ?
          <div className="joining-container">
            <img src={joiningImg} alt="joining" />
            <p>
              We found a good pal for you, click button to join room.
            </p>
            <div>
              <Button variant="info"
                      onClick={() => this.handleJoinRoom()}>
                Join Room
              </Button>
            </div>
          </div>
          :
          notReady
        }
        <MatchModal
          show={showModal}
          ownsRoom={ownsRoom}
          onSure={(roomName) => this.deleteOwnsRoom(roomName)}
        />
        <LoadingModal show={this.props.UI.loading} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  username: state.user.profile.handle,
  matching: state.user.profile.matching,
  ownsRoom: state.user.profile.ownsRoom,
  UI: state.UI
});
export default connect(
  mapStateToProps,
  { startMatching, joinMatchedRoom, deleteRoomNoRedirect }
)(Match);

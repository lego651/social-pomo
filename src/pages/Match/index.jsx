import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../utils/firebase.js';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faEdit } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
// import MyModal from '../../components/MyModal';
import { startMatching, joinMatchedRoom } from '../../actions';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';

class Match extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('ready');
    this.unsubscribe = null;
    this.state = {
      errors: {},
      pairs: [],
      inPairs: false,
      roomName: ''
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
    const { matching } = this.props;
    // console.log(this.curHandle);
    // console.log(this.state.pairs);
    console.log(this.state.inPairs);
    const notReady = (
      <div>
        {
          matching
          ?
          <div>
            waiting...
          </div>
          :
          <Button onClick={() => this.handleClick()}>
            Match
          </Button>
        }
      </div>
    )
    return(
      <div className="match-container">
        <NavbarTop />
        {
          inPairs
          ?
          <div onClick={() => this.handleJoinRoom()}> Click to Join room... </div>
          :
          notReady
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  username: state.user.profile.handle,
  matching: state.user.profile.matching,
  UI: state.UI
});
export default connect(
  mapStateToProps,
  { startMatching, joinMatchedRoom }
)(Match);

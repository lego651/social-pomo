import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "../../utils/firebase.js";

// Components
import { Button, Container } from "react-bootstrap";
import NavbarTop from "../../components/NavbarTop";
import NavLeft from '../../components/NavLeft';
import NavLeftMobile from '../../components/NavLeftMobile/navLeftMobile.jsx';
import LoadingModal from "../../components/LoadingModal";
import MatchModal from "./MatchModal";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import connectingImg from "../../assets/img/connecting.svg";
import loadingImg from "../../assets/img/loading.gif";
import joiningImg from "../../assets/img/joining.svg";

// Styles
import "./style.scss";

// Actions
import {
  startMatching,
  joinMatchedRoom,
  deleteRoomNoRedirect,
} from "../../actions";

class Match extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("ready");
    this.unsubscribe = null;
    this.state = {
      errors: {},
      pairs: [],
      inPairs: false,
      roomName: "",
      modalShow: true,
    };
    this.curHandle = props.username;
    this.onUpdatePairs = this.onUpdatePairs.bind(this);
  }

  onUpdatePairs = (snapshot) => {
    const pairs = [];
    snapshot.forEach((doc) => {
      pairs.push({
        handle: doc.data().handle,
        room: doc.data().room,
      });
    });
    this.setState({
      pairs,
    });
  };

  handleClick = () => {
    this.props.startMatching();
  };

  handleGoBack = () => {
    this.props.history.goBack();
  };

  handleJoinRoom = () => {
    this.props.joinMatchedRoom(this.state.roomName, this.props.history);
  };

  setModalShow = (bool) => {
    this.setState({
      modalShow: bool,
    });
  };

  deleteOwnsRoom = (roomName) => {
    this.props.deleteRoomNoRedirect(roomName);
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onUpdatePairs);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.inPairs && this.props.username) {
      for (let i = 0, len = this.state.pairs.length; i < len; i++) {
        if (this.state.pairs[i].handle === this.props.username) {
          this.setState({
            inPairs: true,
            roomName: this.state.pairs[i].room,
          });
        }
      }
    }
  }

  buildGoBack = () => {
    return (
      <div className="back-container">
        <Container>
          <div className="back-button" onClick={this.handleGoBack}>
            <span>
              <FontAwesomeIcon icon={faArrowCircleLeft} />
            </span>
          </div>
        </Container>
      </div>
    )
  }

  buildContent = () => {
    const { inPairs } = this.state;
    const { matching, ownsRoom } = this.props;
    const showModal = ownsRoom && ownsRoom.length > 0;
    const notReady = (
      <div className="not-ready-container">
        {matching ? (
          <div className="waiting-container">
            <img src={loadingImg} alt="loading" />
            <p>
              Pomopal is working hard to connect you with another sould. If you
              have waited for long time, you can also try to create a new room
              and invite your friend.
            </p>
            <Button variant="info">Matching...</Button>
          </div>
        ) : (
          <div className="matching-container">
            <img src={connectingImg} alt="connecting" />
            <p>
              Pomopal will connect you with another user who wants to start a
              pomodoro at this moment...
            </p>
            <div>
              <Button variant="info" onClick={() => this.handleClick()}>
                Match
              </Button>
            </div>
          </div>
        )}
      </div>
    )
    
    return (
      <div className="content">
        {this.buildGoBack()}
        {inPairs ? (
          <div className="joining-container">
            <img src={joiningImg} alt="joining" />
            <p>We found a good pal for you, click button to join room.</p>
            <div>
              <Button variant="info" onClick={() => this.handleJoinRoom()}>
                Join Room
              </Button>
            </div>
          </div>
        ) : (
          notReady
        )}
        <MatchModal
          show={showModal}
          ownsRoom={ownsRoom}
          onSure={(roomName) => this.deleteOwnsRoom(roomName)}
        />
        <LoadingModal show={this.props.UI.loading} />
      </div>
    )
  }
  
  render() {
    return (
      <div className="match-container">
        <NavbarTop />
        <div className="body-container">
          <NavLeft />
          <NavLeftMobile />
          {this.buildContent()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  username: state.user.profile.handle,
  matching: state.user.profile.matching,
  ownsRoom: state.user.profile.ownsRoom,
  UI: state.UI,
});
export default connect(mapStateToProps, {
  startMatching,
  joinMatchedRoom,
  deleteRoomNoRedirect,
})(Match);

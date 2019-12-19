import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import joinRoomImg from '../../../assets/img/join-room.svg';
import { joinRoom } from '../../../actions';

class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: ''
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const existingRoom = {
      roomName: this.state.roomName
    }
    this.props.joinRoom(existingRoom, this.props.history);
  }
  render(){
    return(
      <div className="joinroom-container">
        <h3> Join Room </h3>
        <img src={joinRoomImg} alt="join-room" />
        <div className="joinroom-form">
          <input type="text"
                 placeholder="Enter room name"
                 name="roomName"
                 onChange={(e) => {this.handleChange(e)}} />
          <span onClick={(e) => {this.handleSubmit(e)}}>
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});
export default connect(
  mapStateToProps,
  { joinRoom }
)(JoinRoom);

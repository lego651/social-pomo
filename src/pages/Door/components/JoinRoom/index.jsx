import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import joinRoom from '../../../../assets/img/join-room.svg';

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
    console.log(existingRoom);
    this.props.onJoinRoom(existingRoom, this.props.history);
  }
  render(){
    return(
      <div className="joinroom-container">
        <h3> Join Room </h3>
        <img src={joinRoom} />
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

export default JoinRoom;

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
      content: ''
    }
  }
  render(){
    return(
      <div className="joinroom-container">
        <h3> Join Room </h3>
        <img src={joinRoom} />
        <div className="joinroom-form">
          <input type="text"
                 placeholder="Enter room name" />
          <span>
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </span>
        </div>
      </div>
    )
  }
}

export default JoinRoom;

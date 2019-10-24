import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import createRoom from '../../../../assets/img/create-room.svg';

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }
  render(){
    return(
      <div className="createroom-container">
        <h3> Create Room </h3>
        <img src={createRoom} />
        <div className="createroom-form">
          <input type="text"
                 placeholder="Enter room name" />
          <span>
            <FontAwesomeIcon icon={faPlusCircle} />
          </span>
        </div>
      </div>
    )
  }
}

export default CreateRoom;

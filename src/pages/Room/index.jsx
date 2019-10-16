import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import Chatroom from '../../components/Chatroom';
import './style.scss';

class Room extends Component {
  render(){
    const { roomname } = this.props.match.params
    return(
      <div className="room-container">
        <Chatroom roomname={roomname} />
      </div>
    )
  }
}

export default Room;

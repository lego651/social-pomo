import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import Pomodoro from '../../components/Pomodoro';
import Chatroom from '../../components/Chatroom';

import './style.scss';

class Room extends Component {
  render(){
    return(
      <div className="room-container">
        <Row>
          <Col md={6} sm={12}>
            <Pomodoro />
          </Col>
          <Col md={6} sm={12}>
            <Chatroom />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Room;

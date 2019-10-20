import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import Chatroom from '../../components/Chatroom';
import Pomodoro from '../../components/Pomodoro';
import WhatTodo from '../../components/WhatTodo';
import './style.scss';

class Room extends Component {
  render(){
    const { roomname } = this.props.match.params
    return(
      <div className="room-container">
        <Container>
          <Row>
            <Col>
              <Pomodoro roomName={roomname} />
              <WhatTodo />
            </Col>
            <Col>
              <Chatroom roomname={roomname} />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Room;

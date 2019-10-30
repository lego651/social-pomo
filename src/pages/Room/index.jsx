import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';

import './style.scss';
import Chatroom from '../../components/Chatroom';
import Pomodoro from '../../components/Pomodoro';
import WhatTodo from '../../components/WhatTodo';
import { leaveRoom } from '../../actions';

class Room extends Component {
  handleClick = () => {
    this.props.leaveRoom(this.props.history);
  }
  render(){
    const { roomname } = this.props.match.params
    return(
      <div className="room-container">
        <Container>
          <Row>
            <Col>
              <Pomodoro roomName={roomname} />
              <WhatTodo roomName={roomname} />
              <button onClick={() => {this.handleClick()}}> Leave Room </button>
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

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})
export default connect(
  mapStateToProps,
  { leaveRoom }
)(Room);

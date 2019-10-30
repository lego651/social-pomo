import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';

import './style.scss';
import Chatroom from '../../components/Chatroom';
import Pomodoro from '../../components/Pomodoro';
import RoomModal from './RoomModal';
import { leaveRoom, addTodo } from '../../actions';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: true
    }
  }
  setModalShow = (bool) => {
    this.setState({
      modalShow: bool
    })
  }
  addTodo = (content, roomName, handle) => {
    this.props.addTodo(content, roomName, handle);
  }
  onLeave = () => {
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
              <button onClick={() => {this.onLeave()}}> Leave Room </button>
            </Col>
            <Col>
              <Chatroom roomname={roomname} />
            </Col>
          </Row>
        </Container>
        <RoomModal
          show={this.state.modalShow}
          onSend={(content, roomName, handle) => this.addTodo(content, roomName, handle)}
          onHide={() => this.setModalShow(false)}
          roomName={roomname}
          handle={this.props.user.profile.handle}
        />
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
  { leaveRoom, addTodo }
)(Room);

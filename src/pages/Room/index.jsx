import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';

import './style.scss';
import Chatroom from './Chatroom';
import Pomodoro from './Pomodoro';
import RoomModal from './RoomModal';
import NavbarTop from '../../components/NavbarTop';
import { leaveRoom, addTodo } from '../../actions';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: true,
      isOwner: false
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
    const { roomname } = this.props.match.params;
    const { inRoom, ownsRoom } = this.props.user.profile;
    const isOwner = ownsRoom !== null && (inRoom === ownsRoom);
    return(
      <div className="room-container">
        <NavbarTop />
        <Container>
          <Row>
            <Col>
              <Pomodoro roomName={roomname}
                        isOwner={isOwner} />
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

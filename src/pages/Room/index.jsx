import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import './style.scss';
import Commit from './Commit';
import Chatroom from './Chatroom';
import Pomodoro from './Pomodoro';
import RoomModal from './RoomModal';
import NavbarTop from '../../components/NavbarTop';
import UsersInRoom from './UsersInRoom';
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
    this.props.leaveRoom(this.props.history, this.props.match.params.roomname);
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
            <Col md={4}>
              <Commit roomName={roomname}
                      onLeave={() => this.onLeave()}
                      onOpenModal={() => this.setModalShow(true)} />
              <Pomodoro roomName={roomname}
                        isOwner={isOwner} />
            </Col>
            <Col md={8}>
              <UsersInRoom roomName={roomname} />
              <Chatroom roomname={roomname}
                        isOwner={isOwner} />
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

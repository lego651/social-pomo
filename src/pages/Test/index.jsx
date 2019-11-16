import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import './style.scss';
import ChatRoomTest from './ChatRoomTest';
import PomodoroTest from './PomodoroTest';
import RoomModalTest from './RoomModalTest';
import NavbarTop from '../../components/NavbarTop';
import { leaveRoom, addTodo } from '../../actions';

class Test extends Component {
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
            <Col md={4}>
              <PomodoroTest roomName={roomname}
                        isOwner={isOwner}
                        onLeave={() => this.onLeave()}
                        onOpenModal={() => this.setModalShow(true)} />
            </Col>
            <Col md={8}>
              <ChatRoomTest roomname={roomname} />
            </Col>
          </Row>
        </Container>
        <RoomModalTest
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
)(Test);

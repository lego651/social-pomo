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
import LoadingModal from '../../components/LoadingModal';
import { leaveRoom, addTodo } from '../../actions';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
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
    const _history = this.props.history;
    return(
      <div className="room-container">
        <NavbarTop />
        <Container>
          <Row>
            <Col md={4}>
              <Pomodoro roomName={roomname}
                        isOwner={isOwner} />
            </Col>
            <Col md={8} className="roomRight">
              <div className="roomInfo">
                <div>
                  <h2> { roomname } </h2>
                  <UsersInRoom roomName={roomname} />
                </div>
                <div>
                  <Commit
                    isOwner={isOwner}
                    roomName={roomname}
                    onLeave={() => this.onLeave()}
                    onOpenModal={() => this.setModalShow(true)}
                    history={_history} />
                </div>
              </div>
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
        <LoadingModal show={this.props.UI.loading} />
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

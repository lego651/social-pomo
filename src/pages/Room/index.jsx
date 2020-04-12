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
import { leaveRoom, addTodo, startCount } from '../../actions';

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
    const roomName = this.props.match.params.roomname;
    const { avatar, nickName } = this.props.user.profile;
    this.props.leaveRoom(this.props.history, { roomName, avatar, nickName });
  }

  _startCount = (roomName) => {
    this.props.startCount(roomName);
  }

  render(){
    const { roomname } = this.props.match.params;
    const { inRoom, ownsRoom, handle, nickName } = this.props.user.profile;
    const isOwner = ownsRoom !== null && (inRoom === ownsRoom);
    const _history = this.props.history;
    
    return(
      <div className="room-container">
        <NavbarTop />
        <Container>
          <Row>
            <Col md={4}>
              <Pomodoro roomName={roomname}
                        isOwner={isOwner}
                        startCount={(roomName) => this._startCount(roomName)} />
            </Col>
            <Col md={8} className="roomRight">
              <div className="roomInfo">
                <div>
                  <h2> { roomname.length === 20 ? 'Pomo Room' : roomname } </h2>
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
                        isOwner={isOwner}
                        curHandle={handle} 
                        nickName={nickName} />
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
  { leaveRoom, addTodo, startCount }
)(Room);

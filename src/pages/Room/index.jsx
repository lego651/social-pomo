import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { Container, Row, Col } from 'react-bootstrap';
import NavbarTop from '../../components/NavbarTop';
import UsersInRoom from './UsersInRoom';
import LoadingModal from '../../components/LoadingModal';
import Commit from './Commit';
import Chatroom from './Chatroom';
import Pomodoro from './Pomodoro';
import RoomModal from './RoomModal';

// Styles
import './style.scss';

// Actions
import { leaveRoom, addTodo, startCount, updateTime } from '../../actions';
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

  addTodo = (content, roomName) => {
    const { nickName, handle, avatar } = this.props.user.profile;
    this.props.addTodo(content, handle, nickName, avatar, roomName);
  }

  onLeave = () => {
    const roomName = this.props.match.params.roomname;
    const { avatar, nickName } = this.props.user.profile;
    this.props.leaveRoom(this.props.history, { roomName, avatar, nickName });
  }

  _startCount = (roomName) => {
    this.props.startCount(roomName);
  }

  _updateTime = ({roomName, type, time}) => {
    this.props.updateTime({roomName, type, time}); 
  }

  buildRoomModal = () => {
    const { modalShow } = this.state;
    const { roomname } = this.props.match.params;
    return (
      modalShow && <RoomModal
        onSend={this.addTodo}
        onHide={() => this.setModalShow(false)}
        roomName={roomname}
        handle={this.props.user.profile.handle}
        curTodo={this.props.user.todo}
        show={modalShow}
      />
    )
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
            <Col md={4} sm={12} xs={12}>
              <Pomodoro roomName={roomname}
                        isOwner={isOwner}
                        startCount={(roomName) => this._startCount(roomName)} 
                        updateTime={(({roomName, type, time}) => this._updateTime({roomName, type, time}))}/>
            </Col>
            <Col md={8} sm={12} xs={12} className="roomRight">
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
        {this.buildRoomModal()}
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
  { leaveRoom, addTodo, startCount, updateTime }
)(Room);

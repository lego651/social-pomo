import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions 
import { createRoom } from '../../../actions';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// Styles
import './style.scss';
import createRoomImg from '../../../assets/img/create-room.svg';

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.roomName.length === 0) {
      const errors = {
        roomName: 'It must not be empty.'
      }
      this.setState({
        errors
      })
    } else {
      const newRoom = {
        roomName: this.state.roomName,
        nickName: this.props.user.profile.nickName,
        avatar: this.props.user.profile.avatar,
      }
      this.props.createRoom(newRoom, this.props.history);
    }
  }

  render() {
    return (
      <div className="createroom-container">
        <h3> Create Room </h3>
        <img src={createRoomImg} alt="create-room" />
        <div className="createroom-form">
          <input type="text"
            placeholder="Enter room name"
            name="roomName"
            onChange={(e) => { this.handleChange(e) }} />
          <span onClick={(e) => { this.handleSubmit(e) }}>
            <FontAwesomeIcon icon={faPlusCircle} />
          </span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { createRoom }
)(CreateRoom);

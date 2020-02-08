import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../../utils/firebase.js';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import './style.scss';
import { addMessage } from '../../../actions';
import default_img from '../../../assets/img/avatar.svg';
// import Message from '../Message/index.jsx';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import { TextField, Button } from '@material-ui/core';

class UsersInRoom extends Component {
  constructor(props) {
    super(props)
    const roomName = this.props.roomName;
    this.ref = firebase.firestore().collection('rooms').doc(roomName);
    this.unsubscribe = null;
    this.state = {
      users: []
    }
  }
  onUpdateUsers = (doc) => {
    if(doc.data()) {
      this.setState({
        users: doc.data().people
      });
    }
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onUpdateUsers);
  }
  componentWillUnmount() {
    this.setState({
      usres: []
    })
  }
  render(){
    const { users } = this.state;
    return(
      <div className="usersinroom-container">
        {
          users && users.map((user) =>
            <div className= "single-user" key={user.handle}>
              <OverlayTrigger
                key="delete"
                placement="bottom"
                overlay={
                  <Tooltip id="username">
                    { user.handle }
                  </Tooltip>
                }
              >
                <img
                  src={user.avatar ? user.avatar : default_img}
                  alt="avatar"
                />
              </OverlayTrigger>

            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  username: state.user.profile.handle
})
const mapDispatchToProps = (dispatch) => ({
  addMessage: (newMessage) => dispatch(addMessage(newMessage)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersInRoom);

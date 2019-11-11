import React, { Component } from 'react';
import { connect } from 'react-redux';

import firebase from '../../../utils/firebase.js';
import './style.scss';
import { addMessage } from '../../../actions';
import Message from '../Message/index.jsx';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import { TextField, Button } from '@material-ui/core';

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
    this.setState({
      users: doc.data().people
    });
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onUpdateUsers);
  }
  render(){
    const { users } = this.state;
    return(
      <div className="usersinroom-container">
        {
          users && users.map((user) =>
            <p> { user } </p>
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

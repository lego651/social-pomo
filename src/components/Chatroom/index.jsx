import React, { Component } from 'react';
import { connect } from 'react-redux';

import firebase from '../../utils/firebase.js';
import './style.css';
import { addMessage } from '../../actions';

// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import { TextField, Button } from '@material-ui/core';


class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('messages');
    this.unsubscribe = null;
    this.state = {
      messages: [],
      content: ''
    }
  }
  onUpdateMessages = (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({
        userHandle: doc.data().userHandle,
        content: doc.data().content,
        createdAt: doc.data().createdAt
      })
    });
    // messages.sort((a,b) => a.createdAt - b.createdAt);
    this.setState({
      messages
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    const newMessage = {
      userHandle: this.props.username,
      content: this.state.content
    }
    this.props.addMessage(newMessage);
    this.setState({
      content: ''
    })
  }
  componentDidMount() {
    this.unsubscribe = this.ref.orderBy('createdAt').onSnapshot(this.onUpdateMessages);
  }
  render(){
    return(
      <div className="chatroom-container">
        {
          this.state.messages.map(m =>
            <div key={m.messageId}> {m.content} </div>
          )
        }
        <div className="chatroom-input">
          <form onSubmit={(e) => {this.handleSubmit(e)}}>
            <TextField
              type="text"
              name="content"
              label="content"
              onChange={(e) => {this.handleChange(e)}}
              value={this.state.content}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </form>
        </div>
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
)(Chatroom);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import firebase from '../../../utils/firebase.js';
import './style.scss';
import { addMessage } from '../../../actions';
import Message from '../Message/index.jsx';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import { TextField, Button } from '@material-ui/core';



class Chatroom extends Component {
  constructor(props) {
    super(props)
    this.ref = firebase.firestore().collection('rooms').doc(this.props.roomname).collection('messages');
    this.unsubscribe = null;
    this.state = {
      messages: [],
      content: ''
    }
  }
  onUpdateMessages = (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      console.log(doc.data())
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
      content: this.state.content,
      roomName: this.props.roomname
    }
    this.props.addMessage(newMessage);
    this.setState({
      content: ''
    })
  }
  componentDidMount() {
    this.unsubscribe = this.ref.orderBy('createdAt').onSnapshot(this.onUpdateMessages);
    // this.unsubscribe = this.ref.onSnapshot(this.onUpdateMessages);
    this.scrollToBottom()
  }
  componentDidUpdate() {
    this.scrollToBottom()
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  render(){
    const { username } = this.props
    console.log(this.state.messages);
    return(
      <div className="chatroom-container">
        <div className="message-list">
          {
            this.state.messages.map((m, i) =>
              <Message
                Key={i}
                item={m}
                curHandle={username} />
            )
          }
          <div style={{ float:"left", clear: "both" }}
            ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
        <div className="chatroom-input">
          <form onSubmit={(e) => {this.handleSubmit(e)}}>
            <TextField
              className="text"
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

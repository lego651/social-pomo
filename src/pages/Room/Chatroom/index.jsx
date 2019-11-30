import React, { Component } from 'react';
import { connect } from 'react-redux';

import firebase from '../../../utils/firebase.js';
import './style.scss';
import { addMessage, deleteMessages } from '../../../actions';
import Message from '../Message/index.jsx';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSync } from '@fortawesome/free-solid-svg-icons';

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
  componentDidMount() {
    this.unsubscribe = this.ref.orderBy('createdAt').onSnapshot(this.onUpdateMessages);
    // this.unsubscribe = this.ref.onSnapshot(this.onUpdateMessages);
    this.scrollToBottom();
    this.grantNotificationPermission();
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  onUpdateMessages = (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({
        userHandle: doc.data().userHandle,
        content: doc.data().content,
        createdAt: doc.data().createdAt,
        avatar: doc.data().avatar
      })
    });
    // messages.sort((a,b) => a.createdAt - b.createdAt);
    this.setState({
      messages
    }, () => {
      this.showNotification(messages[messages.length - 1])
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.content.length > 0) {
      const newMessage = {
        userHandle: this.props.username,
        content: this.state.content,
        roomName: this.props.roomname
      }
      this.props.addMessage(newMessage);
      this.setState({
        content: ''
      });
    }
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  grantNotificationPermission = () => {
    if (!('Notification' in window)) {
      alert('This browser does not support system notifications');
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification('You are already subscribed to message notifications');
      return;
    }

    if (
      Notification.permission !== 'denied' ||
      Notification.permission === 'default'
    ) {
      Notification.requestPermission().then(result => {
        if (result === 'granted') {
          new Notification(
            'Awesome! You will start receiving notifications shortly'
          );
        }
      });
    }
  };
  showNotification = (message) => {
    const curHandle = this.props.username;
    console.log('showNotification is called,', message)
    console.log('curUsername is', curHandle)
    if (message.userHandle !== curHandle) {
      const title = message.userHandle;
      const body = message.content;
      new Notification(title, { body });
    }
  };
  render(){
    const { username, roomname } = this.props;
    const { loading } = this.props.UI;
    return(
      <div className="chatroom-container">
        <div className="message-list">
          {
            this.state.messages && this.state.messages.map(m =>
              <Message
                key={`${m.createdAt}-${m.content}`}
                item={m}
                curHandle={username} />
            )
          }
          <div style={{ float:"left", clear: "both" }}
            ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
        <div className="chatroom-input">
          <Form onSubmit={(e) => {this.handleSubmit(e)}}>
            <Form.Group controlId="formTextContent">
              <Form.Control
                type="text"
                placeholder="Type a message"
                name="content"
                onChange={(e) => {this.handleChange(e)}}
                value={this.state.content}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              { loading
                  ? <FontAwesomeIcon className="icon" icon={faSync} spin />
                  : <FontAwesomeIcon className="icon" icon={faPaperPlane} />
              }
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  username: state.user.profile.handle,
  UI: state.UI
})
const mapDispatchToProps = (dispatch) => ({
  addMessage: (newMessage) => dispatch(addMessage(newMessage)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatroom);

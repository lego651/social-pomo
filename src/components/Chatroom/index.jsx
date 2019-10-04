import React, { Component } from 'react';
import { connect } from 'react-redux';

import firebase from '../../utils/firebase.js';
import './style.css'

class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('messages');
    this.unsubscribe = null;
    this.state = {
      messages: []
    }
  }
  onUpdateMessages = (snap) => {
    const messages = [];
    snap.forEach((doc) => {
      messages.push({
        userHandle: doc.data().userHandle,
        content: doc.data().content
      })
    });
    this.setState({
      messages
    });
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onUpdateMessages);
  }
  render(){
    return(
      <div className="chatroom-container">
        {
          this.state.messages.map(m =>
            <div key={m.messageId}> {m.content} </div>
          )
        }
      </div>
    )
  }
}

export default Chatroom

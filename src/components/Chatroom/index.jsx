import React, { Component } from 'react';
import { connect } from 'react-redux'

import './style.css'

class Chatroom extends Component {
  render(){
    return(
      <div className="chatroom-container">
        {
          this.props.messages.map(m =>
            <div key={m.messageId}> {m.content} </div>
          )
        }
      </div>
    )
  }
}

export default Chatroom

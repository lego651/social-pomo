import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import Pomodoro from '../../components/Pomodoro';
import Chatroom from '../../components/Chatroom';
import './style.css';

class Room extends Component {
  render(){
    return(
      <div className="room-container">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Pomodoro />
          </Grid>
          <Grid item xs={6}>
            <Chatroom />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Room

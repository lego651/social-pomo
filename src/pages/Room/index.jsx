import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
// Components
import Pomodoro from '../../components/Pomodoro';
import Chatroom from '../../components/Chatroom';
// Actions
// import { getMessages } from '../../actions';
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
// const mapStateToProps = (state) => ({
//   messages: state.room.messages,
// });
// const mapDispatchToProps = (dispatch) => ({
//   getMessages: () => dispatch(getMessages()),
// });
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Room);

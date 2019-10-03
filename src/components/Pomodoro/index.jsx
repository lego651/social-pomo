import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

import { parseTime } from '../../utils/util.js';
import './style.css';

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sec: 25 * 60,
      on: false
    }
  }
  count() {
    if(this.state.on) {
      if(this.state.sec > 0) {
        this.setState(prevState => ({ sec: prevState.sec - 1 }))
      }
    } else {
      this.setState({
        sec: 0,
        on: false
      })
    }
  }
  handleStart() {
    this.setState({
      on: true
    })
    this.interval = setInterval(() => {this.count()}, 1000);
  }
  handlePause() {
    this.setState({
      on: false,
    })
    clearInterval(this.interval);
  }
  handleReset() {
    this.setState({
      sec: 25 * 60,
      on: false
    })
    clearInterval(this.interval);
  }
  render(){
    return(
      <div className="pomodoro-container">
        <h2> {parseTime(this.state.sec)} </h2>
        {
          this.state.on ?
          <div>
            <Button variant="contained"
                    color="primary"
                    onClick={() => this.handlePause()}>
              Pause
            </Button>
            <Button variant="contained"
                    color="primary"
                    onClick={() => this.handleReset()}>
              Reset
            </Button>
          </div>
          :
          <div>
          <Button variant="contained"
                  color="primary"
                  onClick={() => this.handleStart()}>
            Start
          </Button>
          </div>
        }
      </div>
    )
  }
}

export default Pomodoro

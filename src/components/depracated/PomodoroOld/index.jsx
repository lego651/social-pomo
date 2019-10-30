import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

import { parseTime } from '../../utils/util.js';
import firebase from '../../utils/firebase.js';
import './style.css';

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('meta').doc('us');
    this.unsubsrcibe = null;
    this.state = {
      sec: 10,
      ready: false,
      readyCount: 0,
      on: false,
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
  // handlePause() {
  //   this.setState({
  //     on: false,
  //   })
  //   clearInterval(this.interval);
  // }
  handleReset() {
    this.setState({
      sec: 10,
      on: false
    })
    clearInterval(this.interval);
  }
  subscribeReadyCount = (doc) => {
    this.setState({
      readyCount: doc.data().readyCount,
    })
    if(doc.data().readyCount === 2) {
      this.handleStart();
    }
    if(doc.data().readyCount === 0) {
      this.handleReset();
    }
  }
  getReady() {
    axios
      .get('/readyaddone')
      .then((res) => {
        // console.log(res);
        this.setState({
          ready: true
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
  getReset() {
    axios
      .get('/readyminusone')
      .then((res) => {
        // console.log(res);
        this.setState({
          ready: false
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.subscribeReadyCount);
  }
  render(){
    // 当 readyCount == 1的时候，有下面情况
    // on == true & ready = true: 显示 Continue
    // on == false & ready = true: 显示 Waiting...
    // on == true & ready = false: 显示 waiting...
    // on == false & ready = false: 显示 Ready...
    console.log(this.state.readyCount);
    return(
      <div className="pomodoro-container">
        <h2> {parseTime(this.state.sec)} </h2>
        {
          this.state.readyCount === 0
          ? // 如果readyCount === 0, 两边一定都是Ready!
            <Button variant="contained"
                    color="primary"
                    onClick={() => { this.getReady() }}>
              Ready!
            </Button>
          : // readyCount === 1 或者 2
            this.state.readyCount === 1
            ? // readyCount == 1
              this.state.on && this.state.ready
              ? // 如果on == true, 并且 ready == true, 才会显示Continue..,
                <Button variant="contained"
                        color="primary"
                        onClick={() => { this.getReset() }}>
                  Continue
                </Button>
              :
                this.state.on == false && !this.state.ready// 此时显示Ready...
                ?
                  <Button variant="contained"
                          color="primary"
                          onClick={() => { this.getReady() }}>
                    Ready!
                  </Button>
                : // 否则显示Waiting...
                  <Button variant="contained"
                          color="primary">
                    Waiting...
                  </Button>
            : // 否则 readyCount == 2
              <Button variant="contained"
                      color="primary"
                      onClick={() => { this.getReset() }}>
                Continue
              </Button>
        }


      </div>
    )
  }
}

export default Pomodoro

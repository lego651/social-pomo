import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button, Container } from 'react-bootstrap';

import './style.scss';
import { parseTime } from '../../utils/util.js';
import firebase from '../../utils/firebase.js';
import ModalPomo from '../ModalPomo';
import alertAudio from '../../assets/alert.mp3';

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    const roomName = this.props.roomName;
    this.ref = firebase.firestore().collection('rooms').doc(roomName);
    this.unsubsrcibe = null;
    this.audio = new Audio(alertAudio);
    this.state = {
      sec: 10,
      on: false,
      modalShow: false,
    }
  }
  count = () => {
    if(this.state.on) {
      if(this.state.sec > 0) {
        this.setState(prevState => ({ sec: prevState.sec - 1 }))
      } else {
        this.audio.play();
        this.setState({
          on: false,
          modalShow: true,
          sec: 10,
        });
      }
    }
  }
  start = () => {
    this.setState({
      on: true
    })
    this.interval = setInterval(() => {this.count()}, 1000);
  }
  reset = () => {
    this.setState({
      sec: 10,
      on: false
    })
    clearInterval(this.interval);
  }
  handleStart = (e) => {
    e.preventDefault();
    const currentRoom = {
      roomName: this.props.roomName
    }
    axios
      .post('/countaddone', currentRoom)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  // handlePause = () => {
  //   this.setState({
  //     on: false,
  //   })
  //   clearInterval(this.interval);
  // }
  handleReset = (e) => {
    e.preventDefault();
    const currentRoom = {
      roomName: this.props.roomName,
    }
    axios
      .post('/countaddone', currentRoom)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
  }
  subscribeStart = (doc) => {
    if(doc.data().count % 2 === 1) {
      this.start();
    } else {
      this.reset();
    }
  }
  setModalShow = (bool) => {
    this.setState({
      modalShow: bool
    })
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.subscribeStart);
  }
  render() {
    return (
      <div className="pomodoro-container">
        <Container>
        Pomodoro
        <h2> {parseTime(this.state.sec)} </h2>
        {
          this.state.on
            ?
              <Button
                variant="success"
                onClick={(e) => { this.handleReset(e) }}
              >
                Reset
              </Button>
            :
              <Button
                variant="primary"
                onClick={(e) => { this.handleStart(e) }}
              >
                Start
              </Button>
        }
        </Container>
        <ModalPomo
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
        />
      </div>
    )
  }
}

export default Pomodoro;

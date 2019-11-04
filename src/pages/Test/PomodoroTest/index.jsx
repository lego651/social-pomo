import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button, Container, Form, ButtonToolbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { parseTime } from '../../../utils/util.js';
import firebase from '../../../utils/firebase.js';
import PomoModalTest from '../PomoModalTest';
import alertAudio from '../../../assets/alert.mp3';

class PomodoroTest extends Component {
  constructor(props) {
    super(props);
    const roomName = this.props.roomName;
    this.ref = firebase.firestore().collection('rooms').doc(roomName);
    this.unsubsrcibe = null;
    this.audio = new Audio(alertAudio);
    this.state = {
      sec: 5,
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
          sec: 5,
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
      sec: 5,
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
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.subscribeStart);
  }
  render() {
    console.log(this.props.isOwner);
    console.log(this.state.time);
    const forOwner = (
      <div>
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
        <Form onSubmit={() => {console.log(this.state.time)}}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Set Time</Form.Label>
            <Form.Control as="select"
                          name="time"
                          value={this.state.time}
                          onChange={(e)=>{this.handleChange(e)}}>
              <option> 25 </option>
              <option> 45 </option>
              <option> 60 </option>
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
    );
    return (
      <div className="pomodoro-container">
        <Container>
          <ButtonToolbar>
            <Button
              id="leave"
              onClick={() => this.props.onLeave()}>
              <span><FontAwesomeIcon icon={faSignOutAlt}/></span>Leave Room
            </Button>
            <Button
              id="commit"
              onClick={() => this.props.onOpenModal()}>
              <span><FontAwesomeIcon icon={faPencilAlt}/></span>Commit Task
            </Button>
          </ButtonToolbar>
          <div id="count"> {parseTime(this.state.sec)} </div>
          { this.props.isOwner && forOwner }
        </Container>
        <PomoModalTest
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
        />
      </div>
    )
  }
}

export default PomodoroTest;

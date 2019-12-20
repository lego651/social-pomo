import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { parseTime } from '../../../utils/util.js';
import firebase from '../../../utils/firebase.js';
import PomoModal from '../PomoModal';
import alertAudio from '../../../assets/alert.mp3';

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    const roomName = this.props.roomName;
    this.ref = firebase.firestore().collection('rooms').doc(roomName);
    this.unsubsrcibe = null;
    this.audio = new Audio(alertAudio);
    this.state = {
      sec: 25 * 60,
      on: false,
      startTime: null,
      modalShow: false,
    }
  }
  // count = () => {
  //   if(this.state.on) {
  //     if(this.state.sec > 0) {
  //       this.setState(prevState => ({ sec: prevState.sec - 1 }))
  //     } else {
  //       this.audio.play();
  //       this.setState({
  //         on: false,
  //         modalShow: true,
  //         sec: 25 * 60,
  //       });
  //     }
  //   }
  // }
  count = (startTime) => {
    if(this.state.on && this.state.startTime) {
      if(this.state.sec > 0) {
        this.setState({ sec: 25 * 60 - Math.floor((new Date().getTime() - startTime) / 1000) })
      } else {
        this.audio.play();
        this.setState({
          on: false,
          modalShow: true,
          sec: 25 * 60,
        });
      }
    }
  }
  start = (startTime) => {
      this.interval = setInterval((startTime) => {this.count(startTime)}, 1000, startTime);
  }
  reset = () => {
    this.setState({
      sec: 25 * 60,
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
      .post('/startcount', currentRoom)
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
      .post('/resetcount', currentRoom)
      .then((res) => {
        this.setState({
          on: false,
          startTime: null,
          sec: 25 * 60
        })
        clearInterval(this.interval);
      })
      .catch((err) => {
        console.error(err);
      })
  }
  // subscribeStart = (doc) => {
  //   if(doc.data().count % 2 === 1) {
  //     this.start();
  //   } else {
  //     this.reset();
  //   }
  // }
  // subscribeStart = (doc) => {
  //   if(doc.data().on) { // REST请求将此此时设置为on
  //     this.setState({
  //       on: true,
  //       startTime: doc.data().startTime
  //     })
  //     this.start(doc.data().startTime);
  //   } else {
  //     this.reset();
  //   }
  // }
  subscribeStart = (doc) => {
    if(doc.data()) {
      this.setState({
        on: doc.data().on,
        startTime: doc.data().startTime
      })
    }
    if(doc.data() && doc.data().startTime) {
      this.start(doc.data().startTime);
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
  componentWillUnmount() {
    this.unsubscribe = null;
    this.setState({
      sec: 25 * 60,
      on: false,
      startTime: null,
      modalShow: false,
    })
  }
  render() {

    // console.log(this.state);
    const { sec } = this.state;
    const percent = sec / (25 * 60);
    const value = percent * 100;
    console.log(value);

    const forOwner = (
      <div>
        {
            this.state.on
            ?
            <div className="control stop"
                 onClick={(e) => { this.handleReset(e) }} >
              <FontAwesomeIcon icon={faStop} />
            </div>
            :
            <div className="control play"
                 onClick={(e) => { this.handleStart(e) }} >
              <FontAwesomeIcon icon={faPlay} />
            </div>
        }
        {/* <Form onSubmit={() => {console.log(this.state.time)}}>
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
        </Form> */}
      </div>
    );
    return (
      <div className="pomodoro-container">
        <Container>

          <div id="count"> {parseTime(this.state.sec)} </div>
          {/* <div id="count"> {parseTime(this.state.sec)} </div> */}
          <CircularProgressbar
            value={value}
            text={parseTime(this.state.sec)}
            strokeWidth={5}
            styles={buildStyles({
              textColor: "#F07A7E",
              pathColor: "#F07A7E",
              trailColor: "transparent"
            })}
          />
          { this.props.isOwner && forOwner }
        </Container>
        <PomoModal
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
        />
      </div>
    )
  }
}

export default Pomodoro;

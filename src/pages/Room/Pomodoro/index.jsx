import React, { Component } from "react";
import axios from "axios";

// Components
import { Container } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import PomoModal from "../PomoModal";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

// Styles
import "react-circular-progressbar/dist/styles.css";
import "./style.scss";

// Utils
import { parseTime } from "../../../utils/util.js";
import firebase from "../../../utils/firebase.js";
import pomoStartSound from "../../../assets/pomoStartSound.mp3";
import pomoStopSound from "../../../assets/pomoStopSound.mp3";

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    const roomName = this.props.roomName;
    this.ref = firebase
      .firestore()
      .collection("rooms")
      .doc(roomName);
    this.unsubsrcibe = null;
    this.startAudio = new Audio(pomoStartSound);
    this.stopAudio = new Audio(pomoStopSound);
    this.state = {
      on: false,
      startTime: null,
      modalShow: true,
      type: 1,
      time: 25*60,
    };
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

  getDefaultTime = type => {
    return type === 0 ? 1*60 : (type === 1 ? 25*60 : (type === 2 ? 30*60 : 45*60 ));
  }

  count = startTime => {
    const { type } = this.state;
    const defaultTime = this.getDefaultTime(type);

    if (this.state.on && this.state.startTime) {
      if (this.state.time > 0) {
        this.setState({
          time:
            defaultTime -
            Math.floor((new Date().getTime() - startTime) / 1000)
        });
      } else {
        this.stopAudio.play();
        this.setState(
          {
            on: false,
            startTime: null,
            modalShow: true,
            type: 1,
            time: 25*60,
          },
          this.handleReset()
        );
      }
    }
  };

  start = startTime => {
    this.interval = setInterval(
      startTime => {
        this.count(startTime);
      },
      1000,
      startTime
    );
  };

  reset = () => {
    this.setState({
      on: false,
      startTime: null,
      type: 1,
      time: 25*60,
    });
    clearInterval(this.interval);
  };

  handleStart = e => {
    e.preventDefault();
    this.startAudio.play();
    // const currentRoom = {
    //   roomName: this.props.roomName
    // }
    // axios
    //   .post('/startcount', currentRoom)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   })
    this.props.startCount(this.props.roomName);
  };

  // handlePause = () => {
  //   this.setState({
  //     on: false,
  //   })
  //   clearInterval(this.interval);
  // }

  handleReset = () => {
    const currentRoom = {
      roomName: this.props.roomName
    };
    axios
      .post("/resetcount", currentRoom)
      .then(res => {
        this.setState({
          on: false,
          startTime: null,
          modalShow: true,
          type: 1,
          time: 25*60,
        });
        clearInterval(this.interval);
      })
      .catch(err => {
        console.error(err);
      });
  };

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

  subscribeStart = doc => {
    if (doc.data()) {
      this.setState({
        on: doc.data().on,
        startTime: doc.data().startTime,
        type: doc.data().type,
        time: doc.data().time,
      });
    }
    if (doc.data() && doc.data().startTime) {
      this.start(doc.data().startTime);
    }
  };

  setModalShow = bool => {
    this.setState({
      modalShow: bool
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onUpdateTime = ({type, time}) => {
    const { roomName, updateTime } = this.props;
    updateTime({roomName, type, time});
    this.setState({
      type: type,
      time: time
    })
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.subscribeStart);
  }

  componentWillUnmount() {
    this.unsubscribe = null;
    this.setState({
      on: false,
      startTime: null,
      modalShow: true,
      type: 1,
      time: 25*60,
    });
  }

  buildOptions() {
    const { type } = this.state;
    return (
      <div className="options">
        <div className={"option" + (this.state.on ? " inProgress" : "")} id="0" onClick={() => { this.onUpdateTime({type: 0, time: 1*60})}}>
          <div className={"time" + (type === 0 ? ' active' : '')}>
            1
          </div>
          <div className={"icon" + (type === 0 ? ' show' : '')}>
            <span role="img" aria-label="lemon">🍋</span>
          </div> 
        </div>
        <div className={"option" + (this.state.on ? " inProgress" : "")} id="1" onClick={() => this.onUpdateTime({type: 1, time: 25*60})}>
          <div className={"time" + (type === 1 ? ' active' : '')}>
            25
          </div>
          <div className={"icon" + (type === 1 ? ' show' : '')}>
            <span role="img" aria-label="apple">🍅</span>
          </div>           
        </div>
        <div className={"option" + (this.state.on ? " inProgress" : "")} id="2" onClick={() => this.onUpdateTime({type: 2, time: 30*60})}>
          <div className={"time" + (type === 2 ? ' active' : '')}>
            30
          </div>
          <div className={"icon" + (type === 2 ? ' show' : '')}>
            <span role="img" aria-label="apple2">🍏</span>
          </div>
        </div>
        <div className={"option" + (this.state.on ? " inProgress" : "")} id="3" onClick={() => this.onUpdateTime({type: 3, time: 45*60})}>
          <div className={"time" + (type === 3 ? ' active' : '')}>
            45
          </div>
          <div className={"icon" + (type === 3 ? ' show' : '')}>
            <span role="img" aria-label="melon">🍉</span>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { type, time } = this.state;
    const defaultTime = this.getDefaultTime(type);
    const percent = time / defaultTime;
    const value = percent * 100;

    // Deprecated -> both party can start timer now
    // const forOwner = (
    //   <div>
    //     {
    //         this.state.on
    //         ?
    //         <div className="control stop"
    //              onClick={(e) => { this.handleReset(e) }} >
    //           <FontAwesomeIcon icon={faStop} />
    //         </div>
    //         :
    //         <div className="control play"
    //              onClick={(e) => { this.handleStart(e) }} >
    //           <FontAwesomeIcon icon={faPlay} />
    //         </div>
    //     }
    //   </div>
    // );

    return (
      <div className="pomodoro-container">
        <Container>
          { this.buildOptions() }
          <div className="circular-container">
            <CircularProgressbar
              value={value}
              text={parseTime(time)}
              strokeWidth={5}
              styles={buildStyles({
                textColor: "#FB7299",
                pathColor: "#FB7299",
                trailColor: "transparent"
              })}
            />
            {this.state.on ? null : (
              <div
                className="control play"
                onClick={e => {
                  this.handleStart(e);
                }}
              >
                <FontAwesomeIcon icon={faPlay} />
              </div> 
            )}
          </div>
        </Container>
        <PomoModal
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
          type={type}
          time={time}
        />
      </div>
    );
  }
}

export default Pomodoro;

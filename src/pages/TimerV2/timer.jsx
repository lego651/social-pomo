import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// External
import { Tabs } from 'antd';
import ClipLoader from "react-spinners/ClipLoader";

// Components
import Button from "common/Button/button.jsx";
import Icon from "common/Icon/icon.jsx";
import Dropdown from "common/Dropdown/dropdown.jsx";
import Layout from "common/Layout/layout.jsx";
import PomoModal from "./pomoModal.jsx";

// Actions
import { logoutUser, getPomosToday, setPomoTimer, removePomoTimer, openSlideDrawer } from "actions/index.js";

// Utils
import { parseTime } from "utils/util.js";
import pomoStartSound from "assets/pomoStartSound.mp3";
import pomoStopSound from "assets/pomoStopSound.mp3";

// Styles
import "react-circular-progressbar/dist/styles.css";
import "./timer.scss";

const defaultLogTime = 25 * 60;

class Timer extends Component {
  constructor(props) {
    super(props);  
    this.interval = null;
    this.startAudio = new Audio(pomoStartSound);
    this.stopAudio = new Audio(pomoStopSound);
    this.state = {
      value: 0,
      logTime: defaultLogTime,
      on: false,
      showPomoModal: false,
      showCancelModal: false,
    };
    this.showNotification = this.showNotification.bind(this);
  }

  componentDidMount() {
    const { on, startingTime, logTime, pauseTimer } = this.props.user.profile.timer;
    this.grantNotificationPermission();
    
    if (!on && pauseTimer) {
      // 默认进去的时候 on是 null, pausetime也是null
      this.setState({
        on: false,
        value: pauseTimer, 
        logTime: logTime,
      });
    } else if (on && startingTime) {
      this.setState({
        on: true,
        value: Math.floor((Date.now() - startingTime) / 1000),
        logTime: logTime,
      });
      this.interval = setInterval(() => {
        if (this.state.value < this.state.logTime) {	      
          this.setState(prevState => { return {value: prevState.value + 1} })
        } else {	
          this.stopAudio.play();	
          this.showNotification();	
          this.setState({ on: false, value: 0, showPomoModal: true, logTime: defaultLogTime });	
          this.props.setPomoTimer({ on: false, logTime: defaultLogTime });
          clearInterval(this.interval);	
        }
      }, 1000);
    }
  }

  grantNotificationPermission = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
      return;
    }

    // if (Notification.permission === "granted") {
    //   new Notification("You are already subscribed to message notifications");
    //   return;
    // }

    if (
      Notification.permission !== "denied" ||
      Notification.permission === "default"
    ) {
      Notification.requestPermission().then((result) => {
        if (result === "granted") {
          new Notification(
            "Awesome! You will start receiving notifications shortly", {"icon": "/myFavicon.png"}
          );
        }
      });
    }
  };

  showNotification = () => {
    const title = "Pomopal";
    const options = {
      body: "You completed a session.",
      icon: '/myFavico.png'
    };
    new Notification(title, options);
  };

  onStart = e => {
    e.preventDefault();
    this.startAudio.play();
    // this.showPomoStartToast();
    this.setState({ on: true, inputRangeDisabled: true });
    this.props.setPomoTimer({ on: true, startingTime: Date.now() });

    this.interval = setInterval(() => {
      if (this.state.value < this.state.logTime) {	      
        this.setState(prevState => { return {value: prevState.value + 1} })
      } else {	
        this.stopAudio.play();	
        this.showNotification();	
        this.setState({ on: false, value: 0, showPomoModal: true });	
        this.props.setPomoTimer({ on: false });
        clearInterval(this.interval);	
      }
    }, 1000);
  };

  onPause = e => {
    e.preventDefault();
    this.setState({ on: false }, () => {
      this.props.setPomoTimer({ pauseTimer: this.state.value, logTime: this.state.logTime });
    });
    clearInterval(this.interval);
  };

  onReset = () => {
    this.setState({
      on: false,
      value: 0,
      inputRangeDisabled: false,
      showPomoModal: false
    });
    this.props.setPomoTimer({ logTime: defaultLogTime })
    clearInterval(this.interval);
  };

  addTime = () => {
    const { logTime } = this.state;
    if(logTime + 5 * 60 <= 60 * 60) {
      this.setState({logTime: logTime + 5 * 60}, () => {
        this.props.setPomoTimer({ logTime: this.state.logTime });
      })
    }
  }

  minusTime = () => {
    const { logTime } = this.state;
    if(logTime - 5 * 60 >= 0) {
      this.setState({logTime: logTime - 5 * 60}, () => {
        this.props.setPomoTimer({ logTime: this.state.logTime });
      })
    }
  }
  

  setShowPomoModal = (bool) => {
    this.setState({
      showPomoModal: bool,
    });
  };

  setShowCancelModal = (bool) => {
    this.setState({
      showCancelModal: bool,
    });
  };

  buildDisplayTime = () => {
    const { logTime, value } = this.state;
    const displayTime = logTime - value;
    return (
      <div className="time-container">
        <div className="time">
          <h1> {parseTime(displayTime)} </h1>  
        </div> 
      </div>
    )
  }

  buildButtonGroup = () => {
    const { on, startingTime, logTime, pauseTimer } = this.props.user.profile.timer;
    // 只要开始了，就不会显示 - + 了 , 也就是只有on 是 null 的时候才会显示初始的 - + 
    if (on) {
      return (
        <div className="button-group">
          <Button className="pause" shape="pill" size="lg" onClick={this.onPause}><Icon icon="pause" /></Button>
        </div>
      )
    } else {
      if (pauseTimer) {
        return (
          <div className="button-group">
            <Button className="start" shape="pill" size="lg" onClick={this.onStart}><Icon icon="play" /></Button>
            <Button className="reset" shape="pill" size="lg" onClick={this.onReset}><Icon icon="times" /></Button>
          </div>
        )
      } else {
        return (
          <div className="button-group">
            <Button className="left" shape="pill" size="sm" onClick={this.minusTime}><span> - </span></Button>
            <Button className="middle" shape="pill" size="lg" onClick={this.onStart}><Icon icon="play" /></Button>
            <Button className="right" shape="pill" size="sm" onClick={this.addTime}><span> + </span></Button>
          </div>
        )
      }
    }
  }

  render() {
    const { projects } = this.props.user.profile;
    return (
      <Layout>
        <div className="timer-container">
          <div className="project-container">
            <Dropdown displayItem={projects[1]} items={projects} />
          </div>
          {this.buildDisplayTime()}
          {this.buildButtonGroup()}
        </div>
        <PomoModal isOpen={true} />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  pomo: state.pomo,
});

export default connect(mapStateToProps, { logoutUser, getPomosToday, setPomoTimer, removePomoTimer, openSlideDrawer })(
  Timer
);

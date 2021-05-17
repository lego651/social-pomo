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

// Actions
import { logoutUser, getPomosToday, openSlideDrawer } from "actions/index.js";

// Utils
import { parseTime } from "utils/util.js";
import pomoStartSound from "assets/pomoStartSound.mp3";
import pomoStopSound from "assets/pomoStopSound.mp3";

// Styles
import "react-circular-progressbar/dist/styles.css";
import "./timer.scss";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.startAudio = new Audio(pomoStartSound);
    this.stopAudio = new Audio(pomoStopSound);
    this.state = {
      value: 0,
      logTime: 25 * 60,
      on: false,
      inputRangeDisabled: false,
      showPomoModal: false,
      showCancelModal: false,
    };
    this.showNotification = this.showNotification.bind(this);
  }

  showNotification = () => {
    const title = "Pomopal";
    const options = {
      body: "You completed a session.",
      icon: '/myFavico.png'
    };
    new Notification(title, options);
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

  render() {
    const { projects } = this.props.user.profile;
    return (
      <Layout>
        <div className="timer-container">
          <div className="project-container">
            <Dropdown displayItem={projects[1]} items={projects} />
          </div>
          {this.buildDisplayTime()}
          <div className="button-group">
            <Button className="left" shape="pill" size="sm"><span> - </span></Button>
            <Button className="middle" shape="pill" size="lg"><Icon icon="play" /></Button>
            <Button className="right" shape="pill" size="sm"><span> + </span></Button>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  pomo: state.pomo,
});

export default connect(mapStateToProps, { logoutUser, getPomosToday, openSlideDrawer })(
  Timer
);

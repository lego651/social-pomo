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

// Styles
import "react-circular-progressbar/dist/styles.css";
import "./timer.scss";

class Timer extends Component {
  render() {
    const { projects } = this.props.user.profile;
    return (
      <Layout>
        <div className="timer-container">
          <div className="project-container">
            <Dropdown displayItem={projects[1]} items={projects} />
          </div>
          <div className="time-container">
            <div className="time">
              <h1> 12:00 </h1>  
            </div> 
          </div>
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

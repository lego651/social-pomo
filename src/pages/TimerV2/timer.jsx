import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// External
import { Tabs } from 'antd';
import ClipLoader from "react-spinners/ClipLoader";

// Components
import NavbarTop from "components/NavbarTop";
import NavLeft from "components/NavLeft";
import NavLeftMobile from 'components/NavLeftMobile/navLeftMobile.jsx';
import SlideDrawer from "components/SlideDrawer/slideDrawer.jsx";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

// Actions
import { logoutUser, getPomosToday, openSlideDrawer } from "actions/index.js";

// Styles
import "react-circular-progressbar/dist/styles.css";
import "./timer.scss";

class Timer extends Component {
  render() {
    return (
      <div className="timer-container" onClick={this.props.openSlideDrawer}>
        <div className="time-container">
          <h1> 12:00 </h1>   
        </div>
        <div className="button-group">
123
          </div>
      </div>
      // <SlideDrawer />
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

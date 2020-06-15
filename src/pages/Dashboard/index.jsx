import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Components
import { Container, Row, Col } from "react-bootstrap";
import NavbarTop from "../../components/NavbarTop";
import NavLeft from "../../components/NavLeft";
import WeeklyChart from "./weeklyChart";
import WeeklySummary from "./weeklySummary";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faWallet,
  faCalendarWeek,
} from "@fortawesome/free-solid-svg-icons";

// Actions
import { logoutUser, getWeeklyPomo } from "../../actions";

// Styles
import "./style.scss";

// utils
import { convertDateToSeq } from "../../utils/util";
var _ = require("lodash");

class Dashboard extends Component {
  componentWillMount() {
    this.props.getWeeklyPomo();
  }

  handleClick = (e) => {
    this.props.logoutUser();
  };

  handleMatch = (e) => {
    console.log("clicked..");
  };

  buildTitle() {
    return (
      <div className="overview-header">
        <h3> Overview </h3>
        <Link to="/match">
          <FontAwesomeIcon icon={faPlusCircle} /> Match
        </Link>
      </div>
    );
  }

  groupByProject(pomos) {
    return _.groupBy(pomos, "project");
  }

  buildDataSet(pomos) {
    const colors = [
      "#ffe4e1",
      "#a2d7f9",
      "#ffe4b5",
      "#D6E9C6",
      "#fda791",
      "#8B4513",
      "#8FBC8F",
      "#c4d4ff",
      "#b5a8a8",
    ];
    let c = 0;
    const dateObj = new Date();
    const y = dateObj.getFullYear();
    const m = dateObj.getMonth();
    const d = dateObj.getDate();
    const seq = convertDateToSeq(y, m + 1, d);
    const week = [seq - 6, seq - 5, seq - 4, seq - 3, seq - 2, seq - 1, seq];
    const groupedData = this.groupByProject(pomos);
    const datasets = [];

    for (let [project, pomos] of Object.entries(groupedData)) {
      const data = [0, 0, 0, 0, 0, 0, 0];
      const set = {};

      pomos.forEach((pomo) => {
        for (let i = 0; i < week.length; i++) {
          if (pomo.seq === week[i]) {
            data[i] += Math.round((pomo.time / 3600) * 100) / 100;
          }
        }
      });

      set.label = project;
      set.backgroundColor = colors[c++];
      set.data = data;
      datasets.push(set);
    }

    return datasets;
  }

  buildWeeklyChart() {
    const pomos = this.props.pomo.weekly_pomo;
    const datasets = this.buildDataSet(pomos);
    // const labels = [110,111,112,113,114,115,116];

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const d = new Date().getDay();
    const labels = [
      days[(d + 1) % 7],
      days[(d + 2) % 7],
      days[(d + 3) % 7],
      days[(d + 4) % 7],
      days[(d + 5) % 7],
      days[(d + 6) % 7],
      days[d],
    ];

    if (pomos.length > 0) {
      return (
        <div className="chart-container">
          <h1> Last 7 days </h1>
          <WeeklyChart labels={labels} datasets={datasets} />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="overview-container">
        <NavbarTop />
        <Container>
          <Row>
            <Col sm="3" xs="2"> 
              <NavLeft />
            </Col>
            <Col sm= "9" xs="10">
              {this.buildTitle()}
              <WeeklySummary />
              {this.buildWeeklyChart()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  pomo: state.pomo,
});

export default connect(mapStateToProps, { logoutUser, getWeeklyPomo })(
  Dashboard
);

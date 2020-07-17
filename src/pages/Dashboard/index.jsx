import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Components
import NavbarTop from "../../components/NavbarTop";
import NavLeft from "../../components/NavLeft";
import NavLeftMobile from '../../components/NavLeftMobile/navLeftMobile.jsx';
import WeeklyChart from "./weeklyChart";
import PieChart from "./pieChart";
import WeeklySummary from "./weeklySummary";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
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

  getPieData(pomos) {
    const COLORS = [
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
    const groupedData = this.groupByProject(pomos);
    const pieData = {};
    const labels = [];
    const times = [];
    const colors = [];
    let index = 0;

    for (let [project, pomos] of Object.entries(groupedData)) {
      labels.push(project);
      let time = 0;
      pomos.forEach((pomo) => {
        time += Math.round((pomo.time / 3600) * 100) / 100;
      });
      times.push(time);
      colors.push(COLORS[index++]);
    } 

    pieData.labels = labels;
    pieData.times = times;
    pieData.colors = colors; 

    return pieData;
  }

  buildWeeklyChart() {
    const pomos = this.props.pomo.weekly_pomo;
    const datasets = this.buildDataSet(pomos);
    const pieData = this.getPieData(pomos);

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
          <PieChart pieData={pieData} />
        </div>
      );
    }
  }

  buildContent = () => {
    return (
      <div className="content">
        {this.buildTitle()}
        <WeeklySummary />
        {this.buildWeeklyChart()}
      </div>
    )
  }

  render() {
    return (
      <div className="overview-container">
        <NavbarTop />
        <div className="body-container">
          <NavLeft />
          <NavLeftMobile />
          {this.buildContent()}
        </div>
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

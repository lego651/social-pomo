import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// AntD
import { Tabs } from 'antd';

// Components
import NavbarTop from "components/NavbarTop";
import NavLeft from "components/NavLeft";
import NavLeftMobile from 'components/NavLeftMobile/navLeftMobile.jsx';
import LineChart from "./lineChart.jsx";

// Actions
import { logoutUser, getPomosToday } from "actions/index.js";

// Styles
import "./dashboard.scss";
import 'antd/dist/antd.css';

// utils
var _ = require("lodash");
const { TabPane } = Tabs;
const tabsMap = {
  "Today": "today",
  "Week": "week",
  "Month": "month",
  "All Time": "all"
}; 

class Dashboard extends Component {
  componentWillMount() {
    console.log("willMount called...")
    this.props.getPomosToday();
  }

  buildTab = (name, index) => {
    const value = tabsMap[name]
    const active = this.props.match.params.past === value;
    return <Link key={name} to={`/dashboard/${value}`} className={`tab-container ${active ? "active" : ""}`}> <h5>{name}</h5> </Link>
  }

  buildTabs = () => {
    return (
      <div className="tabs-container">
        {Object.keys(tabsMap).map(this.buildTab)}
      </div>
    )
  }  

  buildContent = () => {
    return (
      <div className="content">
        {this.buildTabs()}
        <LineChart />
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

export default connect(mapStateToProps, { logoutUser, getPomosToday })(
  Dashboard
);

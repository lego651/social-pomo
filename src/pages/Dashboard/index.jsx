import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Components
import { Container, Row, Col } from "react-bootstrap";
import NavbarTop from "../../components/NavbarTop";
import NavLeft from "../../components/NavLeft";
import WeeklyChart from "./WeeklyChart";

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
import { convertDateToSeq } from '../../utils/util';
var _ = require('lodash');

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

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

  buildSummary() {
    return (
      <>
        <Row>
          <Col xs="4">
            <div className="panel last-week">
              <div className="panel-header">
                <h5> Today </h5>
                <span className="blue">
                  <FontAwesomeIcon icon={faCalendarWeek} />
                </span>
              </div>
              <h2> 35 </h2>
            </div>
          </Col>
          <Col xs="4">
            <div className="panel last-week">
              <div className="panel-header">
                <h5> Week </h5>
                <span className="blue">
                  <FontAwesomeIcon icon={faCalendarWeek} />
                </span>
              </div>
              <h2> 35 </h2>
            </div>
          </Col>
          <Col xs="4">
            <div className="panel total-pomo">
              <div className="panel-header">
                <h5> All </h5>
                <span>
                  <FontAwesomeIcon icon={faWallet} />
                </span>
              </div>
              <h2> 125 </h2>
            </div>
          </Col>
        </Row>
      </>
    );
  }

  groupByProject(pomos) {
    return _.groupBy(pomos, 'project');
  }
  
  buildDataSet(pomos) {
    const colors = ["#FAEBCC", "#D6E9C6", "#EBCCD1"];
    let c = 0;
    const dateObj = new Date();
    const y = dateObj.getFullYear();
    const m = dateObj.getMonth();
    const d = dateObj.getDate();
    const seq = convertDateToSeq(y, m + 1, d);
    const week = [seq-6,seq-5,seq-4,seq-3,seq-2,seq-1,seq];
    const groupedData = this.groupByProject(pomos);
    const datasets = [];
    
    for (let [project, pomos] of Object.entries(groupedData)) {
      const data = [0,0,0,0,0,0,0];
      const set = {};
        
      pomos.forEach((pomo) => {
        for(let i = 0; i < week.length; i++) {
          if(pomo.seq === week[i]) {
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
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];     
    const d = new Date();     
    const labels = [days[d.getDay() - 6],days[d.getDay() - 5],days[d.getDay() - 4],days[d.getDay() - 3],days[d.getDay() - 2],days[d.getDay() - 1],days[d.getDay()]];   
    
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
            <Col xs="3">
              <NavLeft />
            </Col>
            <Col xs="9">
              {this.buildTitle()}
              {this.buildSummary()}
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

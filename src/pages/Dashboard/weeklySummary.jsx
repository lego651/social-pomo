import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import { Container, Row, Col } from "react-bootstrap";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faWallet,
  faCalendarWeek,
} from "@fortawesome/free-solid-svg-icons";

// Actions
import { logoutUser, getMinutesToday, getMinutesWeek, getMinutesAll} from "../../actions";

// Utils 
import { formatToHourMinute } from "../../utils/util.js";

class WeeklySummary extends Component {
  componentWillMount() {
    this.props.getMinutesToday();
    this.props.getMinutesWeek();
    this.props.getMinutesAll();
  }

  render() {
    return (
      <div className="summary-container">
        <Row>
          <Col xs="12" md="4">
            <div className="panel last-week">
              <div className="panel-header">
                <h5> Today </h5>
                <span className="blue">
                  <FontAwesomeIcon icon={faCalendarWeek} />
                </span>
              </div>
              <h2>{formatToHourMinute(this.props.pomo.minutes_today)}</h2>
            </div>
          </Col>
          <Col xs="12" md="4">
            <div className="panel last-week">
              <div className="panel-header">
                <h5> Week </h5>
                <span className="blue">
                  <FontAwesomeIcon icon={faCalendarWeek} />
                </span>
              </div>
              <h2>{formatToHourMinute(this.props.pomo.minutes_week)}</h2>
            </div>
          </Col>
          <Col xs="12" md="4">
            <div className="panel total-pomo">
              <div className="panel-header">
                <h5> All </h5>
                <span>
                  <FontAwesomeIcon icon={faWallet} />
                </span>
              </div>
              <h2>{formatToHourMinute(this.props.pomo.minutes_all)}</h2>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  pomo: state.pomo,
});

export default connect(mapStateToProps, { logoutUser, getMinutesToday, getMinutesWeek, getMinutesAll })(
  WeeklySummary
);


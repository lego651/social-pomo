import React, { Component } from "react";
import { connect } from "react-redux";

// Extenal
import moment from "moment";
import { Timeline, Radio } from 'antd';

// Components
import { Line } from '@ant-design/charts';

// Actions
import { logoutUser, getPomosToday } from "actions/index.js";

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faClock } from '@fortawesome/free-solid-svg-icons';

// Styles
import "./timeLine.scss";
import 'antd/dist/antd.css';

class TimeLine extends Component {  

  parseTime(utcTime) {
    const offset = moment().utcOffset(); 
    // const localTime = moment.utc(utcTime).utcOffset(offset).format("YYYY-MM-DD, HH:mm");
    const localTime = moment.utc(utcTime).utcOffset(offset).format("HH:mm");
    return localTime;
  }

  parseToMins = (time) => {
    return Math.floor(time / 60);
  }

  buildLabel = (pomo) => {
    return (
      <>
        {/* <FontAwesomeIcon icon={faClock} /> */}
        <span>{this.parseTime(pomo.createdAt)}</span>
        <span>({this.parseToMins(pomo.time)})</span>
      </>
    )
  }

  buildContent = (pomo) => {
    return (
      <>
        {/* <FontAwesomeIcon icon={faTags} /> */}
        <span class="label">{pomo.project}</span>
        <span>{pomo.content}</span>
      </>
    )
  }

  buildTimeline(pomos) {
    if(pomos.length === 0) {
      return <h5> No data </h5>
    }
    return (
      <>
        <Timeline mode="left">
          { 
            pomos.map(pomo => {
              return <Timeline.Item key={pomo.createdAt} label={this.buildLabel(pomo)}>{this.buildContent(pomo)}</Timeline.Item>
            })
          }
        </Timeline>
      </>
    )
  }

  render() {
    const { pomo } = this.props;

    if (!pomo || !pomo.today || !pomo.today.pomos ) {
      return <> Loading... </>
    }

    const pomos = this.props.pomo && this.props.pomo.today.pomos;
    pomos.sort(function(a, b) {
      var c = new Date(a.createdAt);
      var d = new Date(b.createdAt);
      return c-d;
    });

    return (
      <div className="timeline-container">
        <h3>Timeline</h3>
        {this.buildTimeline(pomos)}
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
  TimeLine
);


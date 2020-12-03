import React, { Component } from "react";
import { connect } from "react-redux";

// Extenal
import moment from "moment";
import { Timeline, Radio } from 'antd';

// Components
import { Line } from '@ant-design/charts';

// Actions
import { logoutUser, getPomosToday } from "actions/index.js";

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

  buildTimeline(pomos) {
    if(pomos.length === 0) {
      return <h5> No data </h5>
    }
    return (
      <>
        <Timeline mode="left">
          { 
            pomos.map(pomo => {
              return <Timeline.Item key={pomo.createdAt} label={this.parseTime(pomo.createdAt)}>{pomo.content}</Timeline.Item>
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


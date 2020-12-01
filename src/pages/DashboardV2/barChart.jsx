import React, { Component } from "react";
import { connect } from "react-redux";

// Extenal
import moment from "moment";

// Components
import { Column } from '@ant-design/charts';

// Actions
import { logoutUser, getPomosToday } from "actions/index.js";

// Styles
import "./barChart.scss";
import 'antd/dist/antd.css';

class BarChart extends Component {
  chartRef = React.createRef();

  getHour = (utcTime) => {
    const offset = moment().utcOffset(); 
    const hour = moment.utc(utcTime).utcOffset(offset).format("HH");
    return parseInt(hour);
  }
  
  render() {
    const { pomo } = this.props;
    const data = [
      { hr: "0", mins: null },
      { hr: "1", mins: null },
      { hr: "2", mins: null },
      { hr: "3", mins: null },
      { hr: "4", mins: null },
      { hr: "5", mins: null },
      { hr: "6", mins: null },
      { hr: "7", mins: null },
      { hr: "8", mins: null },
      { hr: "9", mins: null },
      { hr: "10", mins: null },
      { hr: "11", mins: null },
      { hr: "12", mins: null },
      { hr: "13", mins: null },
      { hr: "14", mins: null },
      { hr: "15", mins: null },
      { hr: "16", mins: null },
      { hr: "17", mins: null },
      { hr: "18", mins: null },
      { hr: "19", mins: null },
      { hr: "20", mins: null },
      { hr: "21", mins: null },
      { hr: "22", mins: null },
      { hr: "23", mins: null },
      { hr: "24", mins: null },
    ];

    if (!pomo || !pomo.today || !pomo.today.pomos ) {
      return <> Loading... </>
    }

    const pomos = this.props.pomo && this.props.pomo.today.pomos;
    pomos.forEach(pomo => {
      const hr = this.getHour(pomo.createdAt);
      data[hr].mins += Math.floor(pomo.time / 60);
    })

    const config = {
      data,
      autoFit: true,
      xField: 'hr',
      yField: 'mins',
      xAxis: {
        tickCount: 5,
      },
      label: {
        style: {
          fill: '#aaa',
        },
      },
    };

    return (
      <div className="line-chart-container">
        <Column {...config} chartRef={this.chartRef} />
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
  BarChart
);

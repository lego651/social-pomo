import React, { Component } from "react";
import { connect } from "react-redux";

// Extenal
import moment from "moment";

// Components
import { Line } from '@ant-design/charts';

// Actions
import { logoutUser, getPomosToday } from "actions/index.js";

// Styles
import "./lineChart.scss";
import 'antd/dist/antd.css';

class LineChart extends Component {
  chartRef = React.createRef();

  getHour = (utcTime) => {
    const offset = moment().utcOffset(); 
    const hour = moment.utc(utcTime).utcOffset(offset).format("HH");
    return parseInt(hour);
  }
  
  render() {
    const { pomo } = this.props;
    const data = [
      { hr: "0", value: null },
      { hr: "1", value: null },
      { hr: "2", value: null },
      { hr: "3", value: null },
      { hr: "4", value: null },
      { hr: "5", value: null },
      { hr: "6", value: null },
      { hr: "7", value: null },
      { hr: "8", value: null },
      { hr: "9", value: null },
      { hr: "10", value: null },
      { hr: "11", value: null },
      { hr: "12", value: null },
      { hr: "13", value: null },
      { hr: "14", value: null },
      { hr: "15", value: null },
      { hr: "16", value: null },
      { hr: "17", value: null },
      { hr: "18", value: null },
      { hr: "19", value: null },
      { hr: "20", value: null },
      { hr: "21", value: null },
      { hr: "22", value: null },
      { hr: "23", value: null },
      { hr: "24", value: null },
    ];

    if (!pomo || !pomo.today || !pomo.today.pomos ) {
      return <> Loading... </>
    }

    const pomos = this.props.pomo && this.props.pomo.today.pomos;
    pomos.forEach(pomo => {
      const hr = this.getHour(pomo.createdAt);
      data[hr].value += Math.floor(pomo.time / 60);
    })

    const config = {
      data,
      width: 800,
      height: 400,
      autoFit: true,
      xField: 'hr',
      yField: 'value',
      xAxis: {
        tickCount: 5,
      },
      point: {
        size: 5,
        shape: 'diamond',
      },
      label: {
        style: {
          fill: '#aaa',
        },
      },
    };

    return (
      <div className="line-chart-container">
        <Line {...config} chartRef={this.chartRef} />
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
  LineChart
);

import React, { Component } from "react";
import { Chart } from "chart.js";

class PieChart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    const { pieData } = this.props;

    new Chart(myChartRef, {
        type: 'pie',
        data: {
          labels: pieData.labels,
          datasets: [{
            label: "Population (millions)",
            backgroundColor: pieData.colors,
            data: pieData.times
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Time Distribution'
          }
        }
    });
  }

  render() {
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default PieChart;

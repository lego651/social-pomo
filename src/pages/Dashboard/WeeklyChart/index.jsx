import React, { Component } from "react";
import { Chart } from "chart.js";

class WeeklyChart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: this.props.labels,
        datasets: this.props.datasets
      },
      options: {
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
    });
  }

  render() {
    console.log(this.props.pomos);
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default WeeklyChart;

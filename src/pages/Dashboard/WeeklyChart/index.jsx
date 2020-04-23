import React, { Component } from "react";
import { Chart } from "chart.js";

class WeeklyChart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    const { weeklyPomos } = this.props.pomo.weekly_pomo;

    console.log(weeklyPomos);

    new Chart(myChartRef, {
      type: "bar",
      data: {
        //Bring in data
        labels: [
          // pomos.map((pomo) => {
          //   return pomo.project;
          // }),
        ],
        datasets: [
          {
            label: "project1",
            backgroundColor: "#FAEBCC",
            data: [20, 30, 20, 10],
          },
          {
            label: "project2",
            backgroundColor: "#D6E9C6",
            data: [10, 20, 20, 10],
          },
          {
            label: "project3",
            backgroundColor: "#EBCCD1",
            data: [50, 10, 40, 5],
          },
        ],
      },
      options: {
        //Customize chart options
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
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default WeeklyChart;

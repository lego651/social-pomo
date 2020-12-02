import React, { Component } from "react";
import { connect } from "react-redux";

// Extenal
import { groupBy } from "lodash";

// Components
import { Pie } from '@ant-design/charts';

// Actions
import { logoutUser, getPomosToday } from "actions/index.js";

// Styles
import "./pieChart.scss";
import 'antd/dist/antd.css';

class PieChart extends Component {
  groupByProject = (pomos) => {
    return groupBy(pomos, "project");
  }

  getPieData = (pomos) => {
    const groupedData = this.groupByProject(pomos);
    const pieData = [];

    for (let [project, pomos] of Object.entries(groupedData)) {
      let time = 0;
      pomos.forEach((pomo) => {
        time += this.parseToMins(pomo.time);
      });
      pieData.push({ project, mins: time})
    } 

    return pieData;
  }

  parseToMins = (time) => {
    return Math.floor(time / 60);
  }
  
  parseToHrMins = (time) => {
    let mins = this.parseToMins(time);
    if(mins < 60) {
      return `${mins} mins`;
    } else {
      const h = Math.floor(mins / 60);
      mins = mins % 60;
      return `${h}h ${mins}mins`;
    }
  }

  render() {
    const { pomo } = this.props;
    if (!pomo || !pomo.today || !pomo.today.pomos ) {
      return <> Loading... </>
    }

    const pomos = this.props.pomo && this.props.pomo.today.pomos;
    const data = this.getPieData(pomos);

    const config = {
      appendPadding: 10,
      data: data,
      angleField: 'mins',
      colorField: 'project',
      radius: 1,
      innerRadius: 0.64,
      statistic: {
        title: {
          formatter: function formatter(item) {
            if(!item) {
              return "Total";
            }
            return `${item.project}`;
          },
        }
      },
      meta: {
        value: {
          formatter: function formatter(v) {
            return ''.concat(v, ' \xA5');
          },
        },
      },
      label: {
        type: 'inner',
        offset: '-50%',
        style: { textAlign: 'center' },
        autoRotate: false,
        content: '{value}',
      },
      interactions: [
        { type: 'element-selected' },
        { type: 'element-active' },
        { type: 'pie-statistic-active' },
      ],
    };

    return (
      <div className="bar-chart-container">
        <h3>Time Distribution</h3>
        <h5>Total focused time: <span>{this.parseToHrMins(pomo.today.time)}</span></h5>
        <Pie {...config} />
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
  PieChart
);

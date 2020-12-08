import React, { Component } from "react";
import { connect } from "react-redux";

// External
import ClipLoader from "react-spinners/ClipLoader";

// Components

// Actions
import { logoutUser, getPomosToday } from "actions/index.js";

// Styles
import 'antd/dist/antd.css';

// utils
var _ = require("lodash");

class Week extends Component {
  componentWillMount() {
    this.props.getPomosToday();
  }

  buildCharts = () => {
    const { pomo } = this.props;
    if (!pomo || !pomo.today || !pomo.today.pomos ) {
      return (
        <div className="loading-container"> 
          <ClipLoader
            color={"#ccc"}
            height={15}
            width={5}
            loading={true} /> 
        </div>
      );
    }

    return (
      <>
        Week
      </>
    )
  }

  render() {
    return (
      <div className="week-container">
        {this.buildCharts()}
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
  Week
);

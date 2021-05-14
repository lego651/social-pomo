import React, { Component } from 'react';
import { connect } from 'react-redux';

import SlideDrawer from "common/SlideDrawer/slideDrawer.jsx";

// Actions
import { openSlideDrawer } from "actions/index.js";

// Styles
import "./layout.scss";

class Layout extends Component {
  render() {
    return (
      <div className="layout-container">
        <div className="navbar"> 
          <div> Pomopal </div> 
          <SlideDrawer />
        </div>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { openSlideDrawer }
)(Layout);




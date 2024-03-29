import React, { Component } from 'react';
import { connect } from 'react-redux';

// Styles
import './modal.scss';

// Actions
import { closeSlideDrawer } from '../../actions';

class Modal extends Component {
  render() {
    if(!this.props.isOpen) {
      return null;
    }
    return <div className="modal-container">
      <div className="modal-content">
        {this.props.children}
      </div>
    </div>
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { closeSlideDrawer }
)(Modal);

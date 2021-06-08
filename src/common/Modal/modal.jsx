import React, { Component } from 'react';
import { connect } from 'react-redux';

// Styles
import './modal.scss';

// Actions
import { closeSlideDrawer } from '../../actions';

class Modal extends Component {
  constructor(props) {
    super(props);
   
  }

  render() {
    if(!this.props.isOpen) {
      return null;
    }
    return <div className="modal-container">
      {this.props.children}
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

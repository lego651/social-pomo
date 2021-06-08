// Components
import Modal from "common/Modal/modal.jsx";

import React, { Component } from 'react';
import { connect } from 'react-redux';

// Styles
import './pomoModal.scss';

// Actions
import { closeSlideDrawer } from '../../actions';

class PomoModal extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        child content
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { closeSlideDrawer }
)(PomoModal);

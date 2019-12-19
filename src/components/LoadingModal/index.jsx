import React, { Component } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

import './style.scss';

class LoadingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      errors: {}
    }
  }
  // handleClose = () => this.props.onHide();
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        className="loading-modal">
        <Modal.Body>
          <Spinner
            as="span"
            animation="border"
            size="lg"
            role="status"
            aria-hidden="true"
          />
        </Modal.Body>
      </Modal>
    );
  }
}

export default LoadingModal;

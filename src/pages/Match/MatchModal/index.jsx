import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import './style.scss';

class MatchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSure(this.props.ownsRoom);
  }
  handleClose = () => this.props.onHide();
  render() {
    return (
      <Modal backdrop="static"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Hi, there
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You currently own room "{this.props.ownsRoom}", would you like to delete it and start matching?
        </Modal.Body>
        <Modal.Footer>
          <Link
            to="/room"
          >
            <Button
            id="close"
            variant="secondary"
            >
              Close
            </Button>
          </Link>
          <Button
          id="modalButton"
          onClick={this.handleSubmit}
          > Sure </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MatchModal;

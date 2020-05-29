import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";

class CancelModal extends Component {
  render() {
    return (
      <Modal
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Are you sure to cancel?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              If so, this pomodoro won't be added to your records.
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button id="close" variant="secondary" onClick={this.props.onCancel}>
            Continue to cancel
          </Button>
          <Button variant="primary" onClick={this.props.onBack}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CancelModal;

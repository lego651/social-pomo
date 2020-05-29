import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";

class DeleteRoomModal extends Component {

  handleClose = () => this.props.onClose();

  handleConfirm = () => {
    this.props.onDelete();
    this.props.onClose();
  }

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
            Are you sure to delete this room?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              All messages will be cleared, and this room will be closed.
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button id="close" variant="secondary" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button 
            variant="primary"
            onClick={this.handleConfirm}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeleteRoomModal;

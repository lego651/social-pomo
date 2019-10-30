import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class RoomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      errors: {}
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSend(this.state.content, this.props.roomName, this.props.handle);
    this.props.onHide();
  }
  render() {
    const { errors } = this.state;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            What to focus now?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter what to focus on"
                name="content"
                onChange={(e) => {this.handleChange(e)}}
                isInvalid={!!errors.content}
              />
              <Form.Control.Feedback type="invalid">
                {errors.content}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleSubmit}> Send </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default RoomModal;

import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// Styles
import "./style.scss";

class RoomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      errors: {}
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if(this.state.content.length > 0 && this.state.content !== this.props.curTodo) {
      this.props.onSend(
        this.state.content, 
        this.props.roomName, 
      );
      this.props.onHide();
    }
  };

  handleClose = () => this.props.onHide();

  render() {
    const { content, errors } = this.state;
    const enabled = content.length > 0;
    return (
      <Modal
        backdrop="static"
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
                className="content"
                name="content"
                onChange={e => {
                  this.handleChange(e);
                }}
                isInvalid={!!errors.content}
              />
              <Form.Control.Feedback type="invalid">
                {errors.content}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button id="close" variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button 
            variant="primary"
            onClick={this.handleSubmit}
            disabled={!enabled}
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default RoomModal;

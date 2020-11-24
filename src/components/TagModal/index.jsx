import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class TagModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: '',
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
    this.props.onCreate(this.state.tag);
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
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create new tag
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter project name"
                name="project"
                onChange={(e) => {this.handleChange(e)}}
                isInvalid={!!errors.project}
              />
              <Form.Control.Feedback type="invalid">
                {errors.project}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
          <Button onClick={this.handleSubmit}> Create </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default TagModal;

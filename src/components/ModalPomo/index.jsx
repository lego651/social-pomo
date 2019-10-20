import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class ModalPomo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: '',
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
    this.props.onCreate(this.state.project);
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
            Create new project
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={ (e) => {this.handleSubmit(e)} }>
          <Form.Group controlId="formBasicEmail">
            <Form.Label> What To Focus?</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your task"
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label> select project </Form.Label>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label> Add Tag </Form.Label>
            <Form.Control as="select">
              <option>a</option>
              <option>b</option>
              <option>c</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Join Room
          </Button>
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

export default ModalPomo;

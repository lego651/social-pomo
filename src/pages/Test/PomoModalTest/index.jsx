import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';

import './style.scss';
import { createPomo, removeTodo } from '../../../actions';

class PomoModalTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      project: 'Other',
      tag: [],
      errors: {}
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleMultiChange = (e) => {
    this.setState({
      tag: Array.from(e.target.selectedOptions, (item) => item.value)
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const newContent = this.state.content.length > 0 ? this.state.content : this.props.user.todo;
    const newPomo = {
      content: newContent,
      project: this.state.project,
      tag: this.state.tag
    }
    console.log(newPomo);
    // this.props.onCreate(this.state.project);
    this.props.createPomo(newPomo);
    this.props.removeTodo();
    this.props.onHide();
  }
  render() {
    const { projects, tags } = this.props.user.profile;
    const content = this.props.user.todo;
    console.log(this.state);
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add to history pomo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={ (e) => {this.handleSubmit(e)} }>
          <Form.Group controlId="formBasicEmail">
            <Form.Label> What did you accomplished? </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your task"
              defaultValue={content}
              name="content"
              onChange={(e) => {this.handleChange(e)}}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label> select project </Form.Label>
            <Form.Control as="select"
                          name="project"
                          onChange={(e) => {this.handleChange(e)}}>
              {
                projects && projects.map((p, i) =>
                  <option key={i}> {p} </option>
                )
              }
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label> Add Tag </Form.Label>
            <Form.Control as="select"
                          multiple
                          name="tag"
                          onChange={(e) => {this.handleMultiChange(e)}}>
            {
              tags && tags.map((t, i) =>
                <option key={i}> {t} </option>
              )
            }
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}> Cancel </Button>
          <Button onClick={this.handleSubmit}> Submit </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { createPomo, removeTodo }
)(PomoModalTest);

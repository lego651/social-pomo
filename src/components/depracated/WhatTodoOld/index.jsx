import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import './style.scss';
import { joinRoom } from '../../actions';
class WhatTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      content: ''
    }
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const taskObj = {
      task: 'finish'
    };
    this.props.joinRoom(taskObj, this.props.history);
  }
  render(){
    return(
      <div className="what-todo-container">
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
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { joinRoom }
)(WhatTodo);

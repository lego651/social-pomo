import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { Form, Button } from 'react-bootstrap';

// Actions 
import { addTodo } from '../../actions';

// Styles
import './style.scss';
class WhatTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.props.addTodo(this.state.content, this.props.roomName, this.props.user.profile.handle);
    this.setState({
      content: ''
    })
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
              name="content"
              onChange={(e) => {this.handleChange(e)}}
              value={this.state.content}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Send to chat.
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
  { addTodo }
)(WhatTodo);

import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { Form, Button } from 'react-bootstrap';

// Actions
import { createRoom, joinRoom } from '../../actions';

// Styles
import './style.scss';

class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      roomName: this.state.roomName,
      nickName: this.props.user.profile.nickName,
      avatar: this.props.user.profile.avatar
    }
    this.props.joinRoom(payload, this.props.history);
  }

  render(){
    const { errors } = this.state;
    return(
      <div className="what-todo-container">
        <Form onSubmit={ (e) => {this.handleSubmit(e)} }>
          <Form.Group controlId="formBasicEmail">
            <Form.Label> Room Name </Form.Label>
            <Form.Control
              type="text"
              name="roomName"
              placeholder="Enter your room name"
              onChange={ (e) => {this.handleChange(e)} }
              isInvalid={!!errors.fail}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fail}
            </Form.Control.Feedback>
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
)(JoinRoom);

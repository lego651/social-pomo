import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faEdit } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
// import MyModal from '../../components/MyModal';
import { updatePassword, clearSuccess } from '../../actions';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';
import NavLeftMobile from '../../components/NavLeftMobile/navLeftMobile.jsx';

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      newPassword: '',
      errors: {},
      show: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (nextProps.UI.success) {
      this.setState({
        success: nextProps.UI.success,
        show: true
      });
    }
  }

  closeSuccess = () => {
    this.setState({
      show: false,
      success: null
    })
    this.props.clearSuccess();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  resetState = () => {
    this.setState({
      password: '',
      newPassword: '',
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.password.length === 0) {
      const errors = {
        password: 'It must not be empty.'
      }
      this.setState({
        errors
      })
    } else if(this.state.newPassword.length === 0) {
      const errors = {
        newPassword: 'It must not be empty.'
      }
      this.setState({
        errors
      })
    } else if(this.state.newPassword.length < 6) {
      const errors = {
        newPassword: 'Must be with at least 6 characters.'
      }
      this.setState({
        errors
      })
    } else { // all datq validated, call backend
      const data = {
        password: this.state.password,
        newPassword: this.state.newPassword
      }
      this.props.updatePassword(data, this.resetState);
    }
  }

  buildContent = () => {
    const { errors } = this.state;
    const { loading, success } = this.props.UI;

    return (
      <div className="content">
        {
          this.state.show &&
          <Alert variant="success" onClose={() => this.closeSuccess()} dismissible>
            <p>
              { success }
            </p>
          </Alert>
        }
        <h3> Password </h3>
        <div className="password-body">
          <Form onSubmit={(e) => {this.handleSubmit(e)}}>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Old Password
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="password"
                  placeholder="Your Old Password"
                  name="password"
                  onChange={this.handleChange}
                  isInvalid={!!errors.password}
                  value={this.state.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPassword">
              <Form.Label column sm={3}>
                New Password
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="password"
                  placeholder="Your New Password"
                  name="newPassword"
                  onChange={this.handleChange}
                  isInvalid={!!errors.newPassword}
                  value={this.state.newPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.newPassword}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button
                  variant="success"
                  type="submit">
                  { loading
                      ? <FontAwesomeIcon className="icon" icon={faSync} spin />
                      : <FontAwesomeIcon className="icon" icon={faEdit} />
                  }
                  <span> Save </span>
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="password-container">
        <NavbarTop />
        <div className="body-container">
          <NavLeft />
          <NavLeftMobile />
          {this.buildContent()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { updatePassword, clearSuccess }
)(Password);

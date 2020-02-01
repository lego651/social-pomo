import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSync } from '@fortawesome/free-solid-svg-icons';

import { loginUser } from '../../actions';
import './style.scss';
import loginPic from '../../assets/img/signup.jpeg';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(newUserData, this.props.history);
  }
  render(){
    const { errors } = this.state;
    const { loading } = this.props.UI;
    return(
      <div className="login-container">
          <Row>
            <Col md={5} xs={12} className="left-col">
              <div className="login-left">
                <h3>Sign In</h3>
                <h5>Enter your email address and password to access account.</h5>
                <div className="login-form">
                  <Form onSubmit={(e) => {this.handleSubmit(e)}}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>
                        <h5><b>Email address</b></h5>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={(e) => {this.handleChange(e)}}
                        value={this.state.email}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>
                        <h5><b>Password</b></h5>
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => {this.handleChange(e)}}
                        value={this.state.password}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="info" type="submit" disabled={loading}>
                      { loading
                          ? <FontAwesomeIcon className="icon" icon={faSync} spin />
                          : <FontAwesomeIcon className="icon" icon={faSignInAlt} />
                      }
                      <span> Log In </span>
                    </Button>
                    <div className="link-to-signup">
                      <h5>Don't have an account? <b><Link to="/signup"> Sign Up </Link></b></h5>
                    </div>
                  </Form>
                </div>
              </div>
              {/* log in left ends */}
            </Col>
            <Col md={7} xs={12} className="right-col">
              <div className="login-right">
                <img src={loginPic} alt="loginPic" />
                <h2>I love it!</h2>
              </div>
              {/* log in right ends */}
            </Col>
          </Row>
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
  { loginUser }
)(Login);

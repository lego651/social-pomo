import React, { Component } from "react";
import { connect } from "react-redux";

// Icons
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faSync } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Form, Button } from "react-bootstrap";

// Images
import loginPic from "../../assets/img/signup.jpeg";

// Actions
import { signupUser } from "../../actions";

// Scss
import "./style.scss";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUserData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    const { loading } = this.props.UI;
    return (
      <div className="signup-container">
        <Row>
          <Col md={5} xs={12} className="left-col">
            <div className="login-left">
              <h3>Free Sign Up</h3>
              <h5>
                Don't have an account? Create your account, it takes less than a
                minute.
              </h5>
              <div className="signup-form">
                <Form
                  onSubmit={e => {
                    this.handleSubmit(e);
                  }}
                >
                  <Form.Group>
                    <Form.Label>
                      <h5>
                        <b>Email address</b>
                      </h5>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      onChange={e => {
                        this.handleChange(e);
                      }}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      <h5>
                        <b>Password</b>
                      </h5>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={e => {
                        this.handleChange(e);
                      }}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>
                      <h5>
                        <b>Confirm Password</b>
                      </h5>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      onChange={e => {
                        this.handleChange(e);
                      }}
                      isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                      <h5>
                        <b>Username</b>
                      </h5>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      name="handle"
                      onChange={e => {
                        this.handleChange(e);
                      }}
                      isInvalid={!!errors.handle}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.handle}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button variant="info" type="submit" disabled={loading}>
                    {loading ? (
                      <FontAwesomeIcon className="icon" icon={faSync} spin />
                    ) : (
                      <FontAwesomeIcon className="icon" icon={faUserPlus} />
                    )}
                    Sign Up
                  </Button>

                  <div className="link-to-login">
                    <h5>
                      Already have account?{" "}
                      <b>
                        <Link to="/login"> Log In </Link>
                      </b>
                    </h5>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
          <Col md={7} xs={12} className="right-col">
            <div className="login-right">
              <img src={loginPic} alt="loginPic" />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(SignUp);

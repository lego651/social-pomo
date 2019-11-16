import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import './style.scss';
import { addProject, removeProject } from '../../actions';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    }
  }
  render(){
    return(
      <div className="password-container">
        <NavbarTop />
        <Container>
          <Row>
            <Col xs="3">
              <NavLeft />
            </Col>
            <Col xs="9">
              <h3> Password </h3>
              <div className="password-body">
                <Form>
                  <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                      Old Password
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control type="password" placeholder="Type in your old password" />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                      New Password
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control type="password" placeholder="Type in your new password" />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                      Confirm New Password
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control type="password" placeholder="Confirm your new password" />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Button type="submit"> Submit </Button>
                    </Col>
                  </Form.Group>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
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
  { addProject, removeProject }
)(Password);

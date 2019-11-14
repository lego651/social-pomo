import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import './style.scss';
import MyModal from '../../components/MyModal';
import { addProject, removeProject } from '../../actions';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';
import avatar from '../../assets/img/default_avatar.jpg';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    }
  }
  render(){
    const { email, handle } = this.props.user.profile;
    return(
      <div className="account-container">
        <NavbarTop />
        <Container>
          <Row>
            <Col xs="3">
              <NavLeft />
            </Col>
            <Col xs="9">
              <h3> My Account </h3>
              <div className="account-body">
                <div className="account-avatar">
                  <img src={avatar} alt="avatar" />
                  <span> Edit </span>
                </div>
                <Form>
                  <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                      Email
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control type="email" placeholder={email} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                      User Name
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control type="text" placeholder={handle} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Button type="submit"> Save </Button>
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
)(Account);

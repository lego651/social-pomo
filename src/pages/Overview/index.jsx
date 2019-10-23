import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Button, Container, Row, Col, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../actions';
import CreateRoom from '../../components/CreateRoom';
import JoinRoom from '../../components/JoinRoom';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';
import './style.scss';

class Overview extends Component {
  handleClick = (e) => {
    this.props.logoutUser();
  }
  render(){
    const _history = this.props.history;
    return(
      <div className="overview-container">
        <NavbarTop />
        <Container>
          <Row>
            <Col xs="3">
              <NavLeft />
            </Col>
            <Col xs={{ size: '8', offset: 1 }}>
              Content
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
  { logoutUser }
)(Overview);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Button, Container, Row, Col, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faWallet, faCalendarWeek } from '@fortawesome/free-solid-svg-icons';

import { logoutUser } from '../../actions';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';
import InRoom from './components/InRoom';
import JoinRoom from './components/JoinRoom';
import CreateRoom from './components/CreateRoom';
import './style.scss';

class Door extends Component {
  handleClick = (e) => {
    this.props.logoutUser();
  }
  render(){
    const _history = this.props.history;
    return(
      <div className="door-container">
        <NavbarTop />
        <Container>
          <Row>
            <Col xs="3">
              <NavLeft />
            </Col>
            <Col xs="9">
              <div className="door-header">
                <h3> Room </h3>
              </div>
              <Row>
                <Col>
                  <InRoom />
                </Col>
                <Col>
                  <JoinRoom />
                </Col>
                <Col>
                  <CreateRoom />
                </Col>
              </Row>
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
)(Door);

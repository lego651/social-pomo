import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Button, Container, Row, Col, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faWallet, faCalendarWeek } from '@fortawesome/free-solid-svg-icons';

import { joinRoom } from '../../actions';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';
import InRoom from './InRoom';
import JoinRoom from './JoinRoom';
import CreateRoom from './CreateRoom';
import './style.scss';

class Door extends Component {
  _onJoinRoom = (roomObj, history) => {
    if(roomObj !== null) {
      this.props.joinRoom(roomObj, history);
    }
  }
  render(){
    const _history = this.props.history;
    const { inRoom } = this.props.user.profile;
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
                {
                  inRoom !== null
                  ?
                  <Col>
                    <InRoom roomName={inRoom} />
                  </Col>
                  :
                  <Col>
                    <JoinRoom history={_history}
                    />
                  </Col>
                }
                <Col>
                  <CreateRoom history={_history} />
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
  { joinRoom }
)(Door);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faWallet, faCalendarWeek } from '@fortawesome/free-solid-svg-icons';

import { logoutUser } from '../../actions';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';
import './style.scss';

class Overview extends Component {
  handleClick = (e) => {
    this.props.logoutUser();
  }
  render(){
    return(
      <div className="overview-container">
        <NavbarTop />
        <Container>
          <Row>
            <Col xs="3">
              <NavLeft />
            </Col>
            <Col xs="9">
              <div className="overview-header">
                <h3> Overview </h3>
                <Link to="/room">
                  <FontAwesomeIcon icon={faPlusCircle} /> Start
                </Link>
              </div>
              <Row>
                <Col xs="4">
                  <div className="panel total-pomo">
                    <div className="panel-header">
                      <h5> Total Pomos </h5>
                      <span><FontAwesomeIcon icon={faWallet} /></span>
                    </div>
                    <h2> 125 </h2>
                  </div>
                  <div className="panel last-week">
                    <div className="panel-header">
                      <h5> Last 7 days </h5>
                      <span className="blue"><FontAwesomeIcon icon={faCalendarWeek } /></span>
                    </div>
                    <h2> 35 </h2>
                  </div>
                </Col>
                <Col xs="8">
                  Chart
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
)(Overview);

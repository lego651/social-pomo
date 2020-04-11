import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import { Container, Row, Col } from 'react-bootstrap';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faWallet, faCalendarWeek } from '@fortawesome/free-solid-svg-icons';

// Actions
import { logoutUser, getWeeklyPomo } from '../../actions';

// Styles
import './style.scss';

class Dashboard extends Component {
  componentWillMount() {
    this.props.getWeeklyPomo();
  }

  handleClick = (e) => {
    this.props.logoutUser();
  }

  handleMatch = (e) => {
    console.log('clicked..');
  }

  buildTitle() {
    return (
      <div className="overview-header">
        <h3> Overview </h3>
        <Link to="/match">
          <FontAwesomeIcon icon={faPlusCircle} /> Match
        </Link>
      </div>
    )
  }

  buildSummary() {
    return (
      <>
        <Row>
          <Col xs="4">
            <div className="panel last-week">
              <div className="panel-header">
                <h5> Today </h5>
                <span className="blue"><FontAwesomeIcon icon={faCalendarWeek } /></span>
              </div>
              <h2> 35 </h2>
            </div>
          </Col>
          <Col xs="4">
            <div className="panel last-week">
              <div className="panel-header">
                <h5> Week </h5>
                <span className="blue"><FontAwesomeIcon icon={faCalendarWeek } /></span>
              </div>
              <h2> 35 </h2>
            </div>
          </Col>
          <Col xs="4">
            <div className="panel total-pomo">
              <div className="panel-header">
                <h5> All </h5>
                <span><FontAwesomeIcon icon={faWallet} /></span>
              </div>
              <h2> 125 </h2>
            </div>
          </Col>
        </Row>
      </>
    )
  }

  buildWeeklyChart() {
    const pomos = this.props.pomo.weekly_pomo;
    console.log(pomos);
    if(pomos.length > 0) {
      return (
        <div>
          <h1> Chart </h1>
          { pomos.map((pomo) => { 
              return pomo.content
            })
          }
        </div>
      )
    }
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
              { this.buildTitle() }
              { this.buildSummary() }
              { this.buildWeeklyChart() }
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  pomo: state.pomo
});

export default connect(
  mapStateToProps,
  { logoutUser, getWeeklyPomo }
)(Dashboard);

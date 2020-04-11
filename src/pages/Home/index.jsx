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

class Home extends Component {
  render(){
    return(
      <div className="home-container">
        <NavbarTop />
        <Container>
          <Row>
            <Col xs="3">
              <NavLeft />
            </Col>
            <Col xs="9">
              <div className="home-header">
                <h3> Home </h3>
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
  UI: state.UI,
  pomo: state.pomo
});

export default connect(
  mapStateToProps,
  { logoutUser, getWeeklyPomo }
)(Home);


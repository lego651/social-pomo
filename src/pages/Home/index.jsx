import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar, Nav, ButtonToolbar, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import tomato from '../../assets/img/tomato.png';

class Home extends Component {
  render(){
    return(
      <div className="home-container">
        <Navbar className="nav-container">
          <Navbar.Brand href="/"> <h2>Social Pomo</h2> </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link href="/login"><span><h3>Sign in</h3></span></Nav.Link>
            <Nav.Link href="/signup"><span id="signup"><h3>Sign up</h3></span></Nav.Link>
          </Navbar.Collapse>
        </Navbar>

        <div className="intro-container">
          <h1>Social Pomo</h1>
          <h3>A new way to beat procrastination, stay focused, and get things done.</h3>
          <h3 className="next-line">Stay in the zone with your friend or a stranger. </h3>
          <ButtonToolbar>
            <Button>Get Started</Button>
          </ButtonToolbar>
        </div>
        <div className="highlights">
          <Row className="highlights-1">
            <Col className="content-left" xs="3">
              <h2>Old & New friends</h2>
              <h5>Creat a room and invite your friend to start working with you or join an open room</h5>
              <Button>
                <Link to={"/signup"}>
                  Sign Up
                </Link>
              </Button>
            </Col>
            <Col className="pic-right" xs="7">
              <img src={tomato} alt="tomato" />
            </Col>
          </Row>
          <Row className="highlights-2">
            <Col className="pic-left" xs="7">
              <img src={tomato} alt="tomato" />
            </Col>
            <Col className="content-right" xs="3">
              <h2>Enforced pomodoro tech</h2>
              <h5>Share your goals and start focusing for 25mins</h5>
              <Button>
                <Link to={"/signup"}>
                  Sign Up
                </Link>
              </Button>
            </Col>
          </Row>
          <Row className="highlights-3">
            <Col className="content-left" xs="3">
              <h2>To know everything</h2>
              <h5>A complete history to track your accomplishments</h5>
              <Button>
                <Link to={"/signup"}>
                  Sign Up
                </Link>
              </Button>
            </Col>
            <Col className="pic-right" xs="7">
              <img src={tomato} alt="tomato" />
            </Col>
          </Row>
          <Row className="highlights-4">
            <Col className="pic-left" xs="7">
              <img src={tomato} alt="tomato" />
            </Col>
            <Col className="content-right" xs="3">
              <h2>It works where you go</h2>
              <h5>Anytime, anywhere, available for mobile web, App coming soon</h5>
              <Button>
                <Link to={"/signup"}>
                  Sign Up
                </Link>
              </Button>
            </Col>
          </Row>
        </div>

        <Row className="features">
          <Col xs="4">
            <h3>Stay focused</h3>
            <h3>Get things done</h3>
          </Col>
          <Col xs="4">
            <h3>Meet new friends</h3>
            <h3>Beat procrastination</h3>
          </Col>
          <Col xs="4">
            <h3>Web and App</h3>
            <h3>Get motivated</h3>
          </Col>
        </Row>

        <div className="footer">
          Made with <span><FontAwesomeIcon icon={faHeart} /></span> By J&C
        </div>
        <br />
      </div>
    )
  }
}

export default Home;

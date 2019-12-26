import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar, Nav, ButtonToolbar, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch, faUserFriends, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import TextLoop from "react-text-loop";

import './style.scss';
import workImg from '../../assets/img/work3.svg';
import testImg from '../../assets/img/test.png';

class Home extends Component {
  render(){
    return(
      <div className="home-container">
        <div className="home-header">
          <div className='header-left'>
            Pomopal
          </div>
          <div className="header-right">
            <a href="signup"> Sign up </a>
            <a href="login"> Log in </a>
          </div>
        </div>
        <div className="home-section1">
          <div className="left">
            <div className="slogan">
              A new way to{" "}
            </div>
            <div className="changing">
              <TextLoop>
                <span> Beat Procrastination </span>
                <span> Stay Focused </span>
                <span> Get Things Done </span>
                <span> Boost Productivity </span>
                <span> Make Friends </span>
              </TextLoop>
            </div>
            <div className="sub-slogan">
              Stay in the zone with an accountable pal or your friend.
            </div>
            <Button variant="primary">
              <Link to="/login">
                Get Started
              </Link>
            </Button>
          </div>
          <div className="right">
            <div className="doneImg">
              <img src={workImg} alt="work" />
            </div>
          </div>
        </div>
        <div className="home-section2">
          <Row>
            <Col md={3} xs={6} className="part">
              <div className="icon">
                <span><FontAwesomeIcon icon={faSearch}/></span>
              </div>
              <div className="title">
                Match Pomo Pal
              </div>
              <div className="desc">
                We will pair you with another pomopal who wants to focus at the moment
              </div>
            </Col>
            <Col md={3} xs={6} className="part">
              <div className="icon">
                <span><FontAwesomeIcon icon={faUserFriends}/></span>
              </div>
              <div className="title">
                Invite Friend
              </div>
              <div className="desc">
                We will pair you with another pomopal who wants to focus at the moment
              </div>
            </Col>
            <Col md={3} xs={6} className="part">
              <div className="icon">
                <span><FontAwesomeIcon icon={faSearch}/></span>
              </div>
              <div className="title">
                Stay Focused
              </div>
              <div className="desc">
                We will pair you with another pomopal who wants to focus at the moment
              </div>
            </Col>
            <Col md={3} xs={6} className="part">
              <div className="icon">
                <span><FontAwesomeIcon icon={faSearch}/></span>
              </div>
              <div className="title">
                History Records
              </div>
              <div className="desc">
                We will pair you with another pomopal who wants to focus at the moment
              </div>
            </Col>
          </Row>
        </div>

      </div>
    )
  }
}

export default Home;

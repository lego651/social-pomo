import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextLoop from "react-text-loop"

// Components
import { Button, Nav, Row, Col, Container, Tab } from 'react-bootstrap';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faArrowRight, faLink, faUserFriends, faLaptopCode, faHistory } from '@fortawesome/free-solid-svg-icons';
import startupImg from '../../assets/img/startup.svg';
import tab1Img from '../../assets/img/tab1.jpg';
import tab2Img from '../../assets/img/tab2.jpg';
import tab3Img from '../../assets/img/tab3.jpg';
import tab4Img from '../../assets/img/tab4.jpg';

// Styles
import './style.scss';

class Landing extends Component {
  render(){
    return(
      <div className="landing-container">
          <div className="nav-section">
            <Container>
              <Row>
                <Col md={2} xs={4} className="logo">
                  POMOPAL
                </Col>
                <Col md={8} xs={4} className="navs">
                  Features 
                </Col>
                <Col md={2} xs={4} className="login">
                  <Link to="/login">
                    <span><FontAwesomeIcon icon={faSignInAlt} /></span> Log in 
                  </Link>
                </Col>
              </Row>
            </Container>
        </div>
        <div className="hero-section">
          <Container>
            <Row>
              <Col md={6} xs={12}>
                <Container>
                  <div className="slogan">
                    A new way to{" "}
                  </div>
                  <div className="changing">
                    <TextLoop interval={5000}>
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
                  <Button variant="success">
                    <Link to="/login">
                      Get Started <span><FontAwesomeIcon icon={faArrowRight} /></span>
                    </Link>
                  </Button>
                </Container>
              </Col>
              <Col md={6} xs={12}>
                <Container>
                  <div className="img-wrapper">
                    <img src={startupImg} alt="startup"/>
                  </div>
                </Container>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="how-it-works-section">
          <Container>
            <div className="title">
              How people use Pomopal
            </div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col xs={12} sm={4} >
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first"> 
                        <span><FontAwesomeIcon icon={faLink}/></span> 
                        Match Pomo Pal 
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second"> 
                        <span><FontAwesomeIcon icon={faUserFriends}/></span>
                        Invite Friends 
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third"> 
                        <span><FontAwesomeIcon icon={faLaptopCode}/></span>
                        Stay Focused 
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="forth"> 
                        <span><FontAwesomeIcon icon={faHistory}/></span>
                        History Records 
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col xs={12} sm={8}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <div className="img-wrapper">
                        <img src={tab1Img} alt="tab1"/>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <div className="img-wrapper">
                        <img src={tab2Img} alt="tab2"/>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <div className="img-wrapper">
                        <img src={tab3Img} alt="tab3"/>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="forth">
                      <div className="img-wrapper">
                        <img src={tab4Img} alt="tab4"/>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Container>
        </div>

        <div className="call-to-action-section">
          <Container>
              Try Pomopal Today?
              <Link>
                Get Started
              </Link>
          </Container>
        </div>

        <div className="footer">
          <div className="logo">
            Pomopal 
          </div>
          <div className="rights">
            @ Pomopal.2020. All rights reserved.
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;


import React, { Component } from 'react';

// Components
import { Container, Row, Col } from 'react-bootstrap';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';

// Styles
import './solo.scss';

class Solo extends Component {
  render() {
    return(
      <div className="solo-container">
        <NavbarTop />
        <Container>
          <Row>
            <Col sm="3" xs="2">
              <NavLeft />
            </Col>
            <Col sm="9" xs="10">
              <div className="solo-header">
                <h3> Solo </h3>
              </div>
            </Col>
          </Row>
        </Container>   
      </div>
    )
  }
}

export default Solo;



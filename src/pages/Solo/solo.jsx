import React, { Component } from 'react';
import InputRange from 'react-input-range';

// Components
import { Container, Row, Col } from 'react-bootstrap';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';

// Styles
import './solo.scss';

class Solo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 25
    }
  }

  buildRangeInput = () => {
    return (
      <>
        <h3>Set Timer</h3>
        <InputRange
          name="Set Timer"
          maxValue={60}
          minValue={0}
          value={this.state.value}
          onChange={value => this.setState({ value })} />
      </>
    )
  }

  buildPomoTimer = () => {
    return (
      <div className="timer-container">
        {this.buildRangeInput()}
      </div>
    )
  }

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
              {this.buildPomoTimer()}
            </Col>
          </Row>
        </Container>   
      </div>
    )
  }
}

export default Solo;



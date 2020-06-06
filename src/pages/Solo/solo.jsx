import React, { Component } from 'react';
import InputRange from 'react-input-range';

// Components
import { Container, Row, Col } from 'react-bootstrap';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';

// Utils
import { parseTime } from "../../utils/util.js";

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// Styles
import './solo.scss';

class Solo extends Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      value: 5,
      on: false,
    }
  }

  onStart = () => {
    this.setState({on: true});
    this.interval = setInterval(
      () => {
        if(this.state.value > 0) {
          this.setState(({value}) => ({value: value - 1}))
        } else {
          this.setState({on: false, value:25*60});
          clearInterval(this.interval);
        }
      }
    , 1000);
  }

  onPause = () => {
    this.setState({on: false});
    clearInterval(this.interval);
  }

  onReset = () => {
    this.setState({on: false, value:25*60});
    clearInterval(this.interval);
  }

  buildRangeInput = () => {
    return (
      <>
        <h3>Set Timer</h3>
        <InputRange
          name="Set Timer"
          maxValue={60}
          minValue={0}
          value={Math.round(this.state.value / 60)}
          onChange={value => this.setState({ value: value * 60})} />
      </>
    )
  }

  buildTimer = () => {
    return (
      <div className="timer">
        {parseTime(this.state.value)}
      </div>
    )
  }

  buildButtonGroup = () => {
    return (
      <div className="buttons">
        {!this.state.on && <span onClick={this.onStart}><FontAwesomeIcon icon={faPlayCircle} /></span>}
        {this.state.on && <span onClick={this.onPause}><FontAwesomeIcon icon={faPauseCircle} /></span>}
        <span onClick={this.onReset}><FontAwesomeIcon icon={faTimesCircle} /></span>
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
              <div className="timer-container">
                {this.buildRangeInput()}
                {this.buildTimer()}
                {this.buildButtonGroup()}
              </div>
            </Col>
          </Row>
        </Container>   
      </div>
    )
  }
}

export default Solo;



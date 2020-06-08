import React, { Component } from "react";
import InputRange from "react-input-range";
import cogoToast from 'cogo-toast';

// Components
import { Container, Row, Col } from "react-bootstrap";
import NavbarTop from "../../components/NavbarTop";
import NavLeft from "../../components/NavLeft";
import PomoModal from "../Room/Pomodoro/pomoModal";
import CancelModal from "../Room/Pomodoro/CancelModal";

// Utils
import { parseTime } from "../../utils/util.js";
import pomoStartSound from "../../assets/pomoStartSound.mp3";
import pomoStopSound from "../../assets/pomoStopSound.mp3";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faPauseCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

// Styles
import "./solo.scss";

class Solo extends Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.startAudio = new Audio(pomoStartSound);
    this.stopAudio = new Audio(pomoStopSound);
    this.state = {
      value: 25 * 60,
      on: false,
      inputRangeDisabled: false,
      showPomoModal: false,
      showCancelModal: false,
    };
  }

  onStart = () => {
    this.setState({ on: true, inputRangeDisabled: true });
    this.startAudio.play();
    this.interval = setInterval(() => {
      if (this.state.value > 0) {
        this.setState(({ value }) => ({ value: value - 1 }));
      } else {
        this.stopAudio.play();
        this.setState({ on: false, value: 25 * 60, showPomoModal: true });
        clearInterval(this.interval);
      }
    }, 1000);
  };

  onPause = () => {
    this.setState({ on: false });
    clearInterval(this.interval);
  };

  onReset = () => {
    this.setState({
      on: false,
      value: 25 * 60,
      inputRangeDisabled: false,
      showPomoModal: false
    });
    clearInterval(this.interval);
  };

  setShowPomoModal = (bool) => {
    this.setState({
      showPomoModal: bool,
    });
  };

  setShowCancelModal = (bool) => {
    this.setState({
      showCancelModal: bool,
    });
  };

  showCancelModal = () => {
    this.setShowPomoModal(false);
    this.setShowCancelModal(true);
  };

  showSuccessToast = () => {
    cogoToast.success("Success!", { position: 'top-right' });
  }

  buildRangeInput = () => {
    return (
      <div className="input-range">
        <h4>Set Timer</h4>
        <InputRange
          name="Set Timer"
          maxValue={60}
          minValue={0}
          value={Math.round(this.state.value / 60)}
          onChange={(value) => this.setState({ value: value * 60 })}
          disabled={this.state.inputRangeDisabled}
        />
      </div>
    );
  };

  buildTimer = () => {
    return <div className="timer">{parseTime(this.state.value)}</div>;
  };

  buildButtonGroup = () => {
    return (
      <div className="buttons">
        {!this.state.on && (
          <span onClick={this.onStart}>
            <FontAwesomeIcon icon={faPlayCircle} />
          </span>
        )}
        {this.state.on && (
          <span onClick={this.onPause}>
            <FontAwesomeIcon icon={faPauseCircle} />
          </span>
        )}
        <span onClick={this.onReset}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </span>
      </div>
    );
  };

  render() {
    return (
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
        <PomoModal
          show={this.state.showPomoModal}
          showCancelModal={this.showCancelModal}
          type={-1}
          time={this.state.value}
          onHide={() => this.setShowPomoModal(false)}
          onSuccess={this.showSuccessToast}
        />
        <CancelModal
          show={this.state.showCancelModal}
          onBack={() => {
            this.setShowCancelModal(false);
            this.setShowPomoModal(true);
          }}
          onCancel={() => {
            this.setShowCancelModal(false);
            this.setShowPomoModal(false);
          }}
        />
      </div>
    );
  }
}

export default Solo;

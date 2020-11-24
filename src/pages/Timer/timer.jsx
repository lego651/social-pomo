import React, { Component } from "react";
import InputRange from "react-input-range";
import cogoToast from 'cogo-toast';

// Components
import NavbarTop from "components/NavbarTop";
import NavLeft from "components/NavLeft";
import NavLeftMobile from 'components/NavLeftMobile/navLeftMobile.jsx';
import PomoModal from "components/PomoModal/pomoModal.jsx";
import CancelModal from "../Room/Pomodoro/CancelModal";

// Utils
import { parseTime } from "utils/util.js";
import pomoStartSound from "assets/pomoStartSound.mp3";
import pomoStopSound from "assets/pomoStopSound.mp3";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faPauseCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

// Images
import working_img from 'assets/img/working.webp';

// Styles
import "./timer.scss";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.startAudio = new Audio(pomoStartSound);
    this.stopAudio = new Audio(pomoStopSound);
    this.state = {
      value: 25 * 60,
      logValue: 25 * 60,
      on: false,
      inputRangeDisabled: false,
      showPomoModal: false,
      showCancelModal: false,
    };
    this.showNotification = this.showNotification.bind(this);
  }

  componentDidMount() {
    this.grantNotificationPermission();
  }

  onStart = () => {
    this.setState({ on: true, inputRangeDisabled: true });
    this.startAudio.play();
    this.showPomoStartToast();
    this.interval = setInterval(() => {
      if (this.state.value > 0) {
        this.setState(({ value }) => ({ value: value - 1 }));
      } else {
        this.stopAudio.play();
        this.showNotification();
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
    cogoToast.success("Logged Successully, Enjoy!", { position: 'top-center' });
  };

  showPomoStartToast = () => {
    cogoToast.loading("Pomodoro Starts, Enjoy!", { position: 'top-center' });
  }

  grantNotificationPermission = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
      return;
    }

    // if (Notification.permission === "granted") {
    //   new Notification("You are already subscribed to message notifications");
    //   return;
    // }

    if (
      Notification.permission !== "denied" ||
      Notification.permission === "default"
    ) {
      Notification.requestPermission().then((result) => {
        if (result === "granted") {
          new Notification(
            "Awesome! You will start receiving notifications shortly", {"icon": "/myFavicon.png"}
          );
        }
      });
    }
  };

  showNotification = () => {
    const title = "Pomopal";
    const options = {
      body: "You completed a session.",
      icon: '/myFavico.png'
    };
    new Notification(title, options);
  };

  buildBg = () => {
    return <div className="background"><img src={working_img} alt="Working"/></div>;
  };

  buildRangeInput = () => {
    return (
      <div className="input-range">
        <InputRange
          name="Set Timer"
          maxValue={60}
          minValue={0}
          value={Math.round(this.state.value / 60)}
          onChange={(value) => this.setState({ value: value * 60, logValue: value * 60 })}
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

  buildContent = () => {
    return (
      <div className="content">
        <div className="timer-header">
          <h3> Timer </h3>
        </div>
        <div className="timer-body">
          {this.buildBg()}
          {this.buildRangeInput()}
          {this.buildTimer()}
          {this.buildButtonGroup()}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="timer-container">
        <NavbarTop />
        <div className="body-container">
          <NavLeft />
          <NavLeftMobile />
          {this.buildContent()}
        </div>
        <PomoModal
          show={this.state.showPomoModal}
          showCancelModal={this.showCancelModal}
          type={-1}
          time={this.state.logValue}
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

export default Timer;

import React, { Component } from "react";
import { connect } from 'react-redux';
import cogoToast from 'cogo-toast';

// Components
import NavbarTop from "../../components/NavbarTop";
import NavLeft from "../../components/NavLeft";
import NavLeftMobile from '../../components/NavLeftMobile/navLeftMobile.jsx';
import PomoModal from "../Room/Pomodoro/pomoModal";
import CancelModal from "../Room/Pomodoro/CancelModal";

// Actions
import { setStopwatchTimer, removeStopwatchTimer } from '../../actions';

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

// Images
import stopwatch_img from '../../assets/img/stopwatch.png';

// Styles
import "./stopwatch.scss";

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.startAudio = new Audio(pomoStartSound);
    this.stopAudio = new Audio(pomoStopSound);
    this.state = {
      showPomoModal: false,
      showCancelModal: false,
    };
  }

  componentDidMount() {
    this.grantNotificationPermission();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onStart = () => {
    const stopwatchTimer = this.props.user.profile.stopwatchTimer;
    this.startAudio.play();
    this.showPomoStartToast();
    this.interval = setInterval(() => {
      this.props.setStopwatchTimer(true, stopwatchTimer + 1);
    }, 1000);
  };

  onPause = () => {
    this.props.setStopwatchTimer(false);
    clearInterval(this.interval);
  };

  onReset = () => {
    if(this.props.user.profile.stopwatchTimer > 0) {
      this.setState({ showPomoModal: true}, () => {
        clearInterval(this.interval);
        this.props.removeStopwatchTimer();
      });
    }
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

  buildBg = () => {
    return <div className="background"><img src={stopwatch_img} alt="Stopwatch"/></div>;
  };

  buildStopwatch = () => {
    const stopwatchTimer = this.props.user.profile.stopwatchTimer;
    return <div className="stopwatch">{parseTime(stopwatchTimer)}</div>;
  };

  buildButtonGroup = () => {
    const stopwatchTimerOn = this.props.user.profile.stopwatchTimerOn
    return (
      <div className="buttons">
        <span onClick={stopwatchTimerOn ? this.onPause : this.onStart}>
          <FontAwesomeIcon icon={stopwatchTimerOn ? faPauseCircle : faPlayCircle} />
        </span>
        <span onClick={this.onReset}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </span>
      </div>
    );
  };

  buildContent = () => {
    return (
      <div className="content">
        <div className="stopwatch-header">
          <h3> Stopwatch </h3>
        </div>
        <div className="stopwatch-body">
          {this.buildBg()}
          {this.buildStopwatch()}
          {this.buildButtonGroup()}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="stopwatch-container">
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

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  { setStopwatchTimer, removeStopwatchTimer }
)(Stopwatch);


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
      value: 0,
      on: false
    };
  }

  componentDidMount() {
    const { on, startingTime, pauseTimer } = this.props.user.profile.stopwatch;
    this.grantNotificationPermission();
    if (!on && pauseTimer) {
      this.setState({
        on: false,
        value: pauseTimer 
      });
    } else if (on && startingTime) {
      this.setState({
        on: true,
        value: Math.floor((Date.now() - startingTime) / 1000)
      });
      this.interval = setInterval(() => {
        this.setState(prevState => { return {value: prevState.value + 1} })
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onStart = () => {
    this.startAudio.play();
    this.showPomoStartToast();
    this.setState({ on: true });
    this.props.setStopwatchTimer({ on: true, startingTime: Date.now() });

    this.interval = setInterval(() => {
      this.setState(prevState => { return {value: prevState.value + 1} })
    }, 1000);
  };

  onPause = () => {
    this.setState({ on: false }, () => {
      this.props.setStopwatchTimer({ time: Date.now() - this.state.value * 1000, pauseTimer: this.state.value });
    });
    clearInterval(this.interval);
  };

  onReset = () => {
    if(this.state.value > 0) {
      this.setState({ on: false, showPomoModal: true }, () => {
        clearInterval(this.interval);
        this.props.removeStopwatchTimer();
        this.setShowPomoModal(true);
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
  };

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
    return <div className="stopwatch">{parseTime(this.state.value)}</div>;
  };

  buildButtonGroup = () => {
    return (
      <div className="buttons">
        <span onClick={this.state.on ? this.onPause : this.onStart}>
          <FontAwesomeIcon icon={this.state.on ? faPauseCircle : faPlayCircle} />
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
  };

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
          time={this.state.time}
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
  };
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  { setStopwatchTimer, removeStopwatchTimer }
)(Stopwatch);


import React, { Component } from "react";
import { connect } from 'react-redux';
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

// Actions
import { setPomoTimer, removePomoTimer } from '../../actions';

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
      value: 0,
      logTime: 25 * 60,
      on: false,
      inputRangeDisabled: false,
      showPomoModal: false,
      showCancelModal: false,
    };
    this.showNotification = this.showNotification.bind(this);
  }

  componentDidMount() {
    const { on, startingTime, logTime, pauseTimer } = this.props.user.profile.timer;
    this.grantNotificationPermission();
    
    if (!on && pauseTimer) {
      // 默认进去的时候 on是 null, pausetime也是null
      this.setState({
        on: false,
        value: pauseTimer, 
        logTime: logTime,
      });
    } else if (on && startingTime) {
      this.setState({
        on: true,
        value: Math.floor((Date.now() - startingTime) / 1000),
        logTime: logTime,
      });
      this.interval = setInterval(() => {
        if (this.state.value < this.state.logTime) {	      
          this.setState(prevState => { return {value: prevState.value + 1} })
        } else {	
          this.stopAudio.play();	
          this.showNotification();	
          this.setState({ on: false, value: 0, showPomoModal: true, logTime: 25 * 60 });	
          this.props.setPomoTimer({ on: false, logTime: 25 * 60 });
          clearInterval(this.interval);	
        }
      }, 1000);
    }
  }

  onStart = () => {
    this.startAudio.play();
    this.showPomoStartToast();
    this.setState({ on: true, inputRangeDisabled: true });
    this.props.setPomoTimer({ on: true, startingTime: Date.now() });

    this.interval = setInterval(() => {
      if (this.state.value < this.state.logTime) {	      
        this.setState(prevState => { return {value: prevState.value + 1} })
      } else {	
        this.stopAudio.play();	
        this.showNotification();	
        this.setState({ on: false, value: 0, showPomoModal: true });	
        this.props.setPomoTimer({ on: false });
        clearInterval(this.interval);	
      }
    }, 1000);
  };

  onPause = () => {
    this.setState({ on: false }, () => {
      this.props.setPomoTimer({ pauseTimer: this.state.value, logTime: this.state.logTime });
    });
    clearInterval(this.interval);
  };

  onReset = () => {
    this.setState({
      on: false,
      value: 0,
      inputRangeDisabled: false,
      showPomoModal: false
    });
    this.props.setPomoTimer({ logTime: 25 * 60 })
    clearInterval(this.interval);
  };

  onInputRangeChange = (value) => {
    this.setState({ value: 0, logTime: value * 60 });
    this.props.setPomoTimer({ logTime: value * 60 });
  }

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

  onSubmitSuccess = () => {
    this.setState({
      inputRangeDisabled: false,
      logTime: 25 * 60
    }, this.showSuccessToast);
    this.props.setPomoTimer({ value: 0, logTime: 25 * 60 });
  }

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
    const { logTime, value } = this.state;
    const displayTime = logTime - value;
    return (
      <div className="input-range">
        <InputRange
          name="Set Timer"
          maxValue={60}
          minValue={0}
          value={Math.round(displayTime / 60)}
          onChange={this.onInputRangeChange}
          disabled={this.state.inputRangeDisabled}
        />
      </div>
    );
  };

  buildTimer = () => {
    const { logTime, value } = this.state;
    const displayTime = logTime - value;
    return <div className="timer">{parseTime(displayTime)}</div>;
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
          time={this.state.logTime}
          onHide={() => this.setShowPomoModal(false)}
          onSubmitSuccess={this.onSubmitSuccess}
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
  { setPomoTimer, removePomoTimer }
)(Timer);

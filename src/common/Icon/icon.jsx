import React, { Component } from 'react';
import classNames from "classnames";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleDown, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

// Styles
import "./icon.scss";

class Icon extends Component {
  constructor(props) {
    super(props);
  }

  buildClassName = () => {
    return classNames("icon-wrapper", this.props.className, {
        "icon-success": this.props.variant === "success",
    });
  }

  render() {
    const iconMap = {
      play: faPlay,
      angleDown: faAngleDown, 
      bars: faBars,
      times: faTimes,
    };
    return (
      <div className={this.buildClassName()} onClick={this.props.onClick}>
        <FontAwesomeIcon icon={iconMap[this.props.icon]} />
        {this.props.children}
      </div>
    );
  }
}

export default Icon;

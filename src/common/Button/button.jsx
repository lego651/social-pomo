import React, { Component } from 'react';
import classNames from "classnames";

// Styles
import "./button.scss";

class Button extends Component {
  constructor(props) {
    super(props);
  }

  buildClassName = () => {
    return classNames("btn", this.props.className, {
        "btn-pill": this.props.shape === "pill",
        "btn-sm": this.props.size === "sm",
        "btn-lg": this.props.size === "lg",
        "btn-success": this.props.variant === "success",
        "btn-with-border": this.props.withBorder === true,
    });
  }

  render() {
    return (
      <button className={this.buildClassName()} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;

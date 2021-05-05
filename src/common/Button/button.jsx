import React, { Component } from 'react';
import classNames from "classnames";

// Styles
import "./button.scss";

class Button extends Component {
  constructor(props) {
    super(props);
  }

  buildClassName = () => {
    return classNames("btn", {
        "btn-pill": this.props.shape === "pill",
        "btn-lg": this.props.size === "lg",
        "btn-success": this.props.variant === "success",
    });
  }

  render() {
    return (
      <button className={this.buildClassName()}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;

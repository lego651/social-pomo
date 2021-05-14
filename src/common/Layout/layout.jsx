import React, { Component } from 'react';

// Styles
import "./layout.scss";

export default function Layout(props) {
    return (
      <div className="layout-container">
        <div className="navbar"> Nav </div>
        {props.children}
      </div>
    )
  }





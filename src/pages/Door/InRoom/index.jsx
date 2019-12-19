import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.scss';
import coWorking from '../../../assets/img/co-working.svg';

class InRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }
  render(){
    const { roomName } = this.props;
    return(
      <div className="inroom-container">
        <h3> Room: { roomName } </h3>
        <img src={coWorking} alt="co-working"/>
          <Link to={`/room/${roomName}`}>
            Enter
          </Link>
      </div>
    )
  }
}

export default InRoom;

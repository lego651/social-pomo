import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.scss';
import coWorking from '../../../../assets/img/co-working.svg';

class InRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }
  render(){
    return(
      <div className="inroom-container">
        <h3> Room: 651 </h3>
        <img src={coWorking} />
        <Button>
          <Link to="/overview">
            Join In
          </Link>
        </Button>
      </div>
    )
  }
}

export default InRoom;

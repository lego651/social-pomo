import React, { Component } from 'react';
import { connect } from 'react-redux';
import Badge from 'react-bootstrap/Badge';

import './style.css';

class Home extends Component {
  render(){
    return(
      <div className="signup-container">
        <Badge pill variant="success"> Home </Badge>
      </div>
    )
  }
}

export default Home;

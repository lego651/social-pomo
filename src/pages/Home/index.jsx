import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, Button } from 'react-bootstrap';

import './style.scss';

class Home extends Component {
  render(){
    return(
      <div className="signup-container">
        Home Page
        <Badge pill variant="success"> Home </Badge>
        <Badge pill variant="success"> <Link to="/room"> Room </Link> </Badge>
        <Badge pill variant="success"> <Link to="/signup"> signup </Link> </Badge>
        <Badge pill variant="success"> <Link to="/login"> login </Link> </Badge>
        <Badge pill variant="success"> <Link to="/profile"> Profile </Link> </Badge>
      </div>
    )
  }
}

export default Home;

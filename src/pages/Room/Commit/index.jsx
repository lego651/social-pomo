import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button, Container, Form, ButtonToolbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

class Commit extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { roomName } = this.props;
    return (
      <div className="commit-container">
        <h2>{ roomName }</h2>
        <ButtonToolbar>
          <Button
            id="leave"
            onClick={() => this.props.onLeave()}>
            <span><FontAwesomeIcon icon={faSignOutAlt}/></span>Leave Room
          </Button>
          <Button
            id="commit"
            onClick={() => this.props.onOpenModal()}>
            <span><FontAwesomeIcon icon={faPencilAlt}/></span>Commit Task
          </Button>
        </ButtonToolbar>
      </div>
    )
  }
}

export default Commit;

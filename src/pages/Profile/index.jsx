import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Button } from 'react-bootstrap';

import { logoutUser } from '../../actions'
import WhatTodo from '../../components/WhatTodo'
import './style.scss';

class Profile extends Component {
  handleClick = (e) => {
    this.props.logoutUser();
  }
  render(){
    const _history = this.props.history;
    return(
      <div className="signup-container">
        <Badge pill variant="success"> Profile </Badge>
        {this.props.user.profile.handle}
        <Button
          variant="primary"
          onClick={() => { this.handleClick() }}>
          log out
        </Button>
        <WhatTodo history={_history}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Profile);

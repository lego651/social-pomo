import React, { Component } from 'react';
import { connect } from 'react-redux';
// Pages
import Login from './pages/Login';
import Room from './pages/Room';

import axios from 'axios';

axios.defaults.baseURL = 'https://us-central1-pomopal-dev.cloudfunctions.net/api';

class App extends Component {
  render() {
    const { username } = this.props
    return (
      <div className="app-container">
        {
          username
          ? <Room />
          : <Login />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  username: state.auth.username
})
export default connect(mapStateToProps)(App);

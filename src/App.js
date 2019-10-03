import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from './pages/Login';
import Room from './pages/Room';

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

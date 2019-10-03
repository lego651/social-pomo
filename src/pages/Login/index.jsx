import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';

import './style.css'

class Login extends Component {
  constructor(){
    super()
    this.state = {
      username: ""
    }
  }

  handleChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    if(this.state.username.trim().length > 0) {
      this.props.loginUser(this.state.username)
    }
  }

  render(){
    return(
      <div className="login-container">
        <div className="login-form">
          <form id="serUsername"
                onSubmit={(e)=>{this.handleSubmit(e)}}>
            <input type="text"
                   className="username"
                   name="username"
                   placeholder="Type your username..."
                   onChange={(e)=>{this.handleChange(e)}} />
            <input type="submit"
                   className="submit-button"
                   value="Join the DoorDash Chat!" />
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (username) => dispatch(loginUser(username)),
})
export default connect(
  null,
  mapDispatchToProps
)(Login)

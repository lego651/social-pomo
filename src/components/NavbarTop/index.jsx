import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Navbar } from 'react-bootstrap';

import './style.scss';
import { addTodo } from '../../actions';
import avatar from '../../assets/img/default_avatar.jpg';
// import { addMessage } from '../../actions';

class NavbarTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }
  render(){
    return(
      <div className="navbar-container">
        <Container>
          <Navbar>
            <Navbar.Brand href="/overview"> Social Pomo </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <img src={avatar} alt="avatar" />
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        </Container>
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
  { addTodo }
)(NavbarTop);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Navbar, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';

import './style.scss';
import { addTodo,logoutUser } from '../../actions';
import avatar from '../../assets/img/default_avatar.jpg';
// import { addMessage } from '../../actions';

class NavbarTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      showMenu: false,
    }
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  showMenu(event) {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  closeMenu(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  }
  handleLogout = () => {
    this.props.logoutUser();
  }

  render(){
    return(
      <div className="navbar-container">
        <Container>
          <Navbar>
            <Navbar.Brand href="/overview"> Social Pomo </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="dropdown">
                <img
                  onClick={this.showMenu}
                  src={avatar}
                  alt="avatar"
                />
                {
                  this.state.showMenu
                     ? (
                       <div

                         ref={(e) => {
                           this.dropdownMenu = e;
                         }}
                       >
                       <div className="dropdown-content">
                           <a onClick={this.handleLogout}>Log out</a>
                           <a href="#">Link 2</a>
                           <a href="#">Link 3</a>
                         </div>
                       </div>
                     )
                     : (
                       null
                     )
                }
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
  { addTodo, logoutUser }
)(NavbarTop);

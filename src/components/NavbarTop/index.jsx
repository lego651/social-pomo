import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Navbar, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { addTodo,logoutUser } from '../../actions';
import default_img from '../../assets/img/avatar.svg';

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
    const { avatar } = this.props.user.profile;
    return(
      <div className="navbar-container">
        <Container>
          <Navbar>
            <Navbar.Brand href="/dashboard"> Social Pomo </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="dropdown">
                <div className="dropdown-wrapper" onClick={this.showMenu}>
                  <img
                    src={avatar ? avatar : default_img}
                    alt="avatar"
                  />
                  <span> <FontAwesomeIcon icon={faCaretDown} /></span>
                </div>
                {
                  this.state.showMenu
                     ? (
                       <div
                         ref={(e) => {
                           this.dropdownMenu = e;
                         }}
                       >
                       <div className="dropdown-content">
                           <a href="/dashboard"> Dashboard </a>
                           <a onClick={this.handleLogout}>Sign out</a>
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

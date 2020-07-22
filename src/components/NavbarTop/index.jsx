import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components 
import { Navbar } from 'react-bootstrap';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faBars } from '@fortawesome/free-solid-svg-icons';

// Styles
import './style.scss';

// Actions
import { addTodo,logoutUser, toggleSidebar } from '../../actions';

// Images
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
    this.menuLinks = [
      {name: "Dashboard", link: "/dashboard"},
      {name: "Room", link: "/room"},
      {name: "Match", link: "/match"},
      {name: "Account", link: "/account"},
    ]
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

  buildAvatar = () => {
    const { avatar } = this.props.user.profile;
    return (
      <div className="dropdown-wrapper" onClick={this.showMenu}>
        <img src={avatar ? avatar : default_img} alt="avatar" /> 
        <span> <FontAwesomeIcon icon={faCaretDown} /></span>
      </div>
    )
  }

  buildNavLinks = () => {
    return (
      this.menuLinks.map(({name, link}) => 
        <a href={link} key={name}> {name} </a>
      )
    )
  }

  buildDropdown = () => {
    return this.state.showMenu && (
      <div ref={(e) => { this.dropdownMenu = e; }}>
        <div className="dropdown-content">
          {this.buildNavLinks()}
          <a href="/" onClick={this.handleLogout}> Sign out </a>
        </div>
      </div>
    )
  }

  buildAvatarAndDropdown = () => {
    return (
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="username">
          { this.props.user.profile.nickName }
        </Navbar.Text>
        <Navbar.Text className="dropdown">
          {this.buildAvatar()}
          {this.buildDropdown()}
        </Navbar.Text>
      </Navbar.Collapse>
    )
  }

  render(){
    return(
      <div className="navbar-container">
        <Navbar>
          <span className="expand-icon" onClick={this.props.toggleSidebar}><FontAwesomeIcon icon={faBars} /></span>
          <Navbar.Brand href="/dashboard"> Pomopal </Navbar.Brand>
          {this.buildAvatarAndDropdown()}
        </Navbar>
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
  { addTodo, logoutUser, toggleSidebar }
)(NavbarTop);

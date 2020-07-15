import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components 
import { Container, Navbar } from 'react-bootstrap';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

// Styles
import './style.scss';

// Actions
import { addTodo,logoutUser } from '../../actions';

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
        <span><FontAwesomeIcon icon={faCaretDown} /></span>
      </div>
    )
  }

  buildDropdown = () => {
    return this.state.showMenu && (
      <div ref={(e) => { this.dropdownMenu = e; }}>
        <div className="dropdown-content">
          <a href="/dashboard"> Dashboard </a>
          <a href="/room"> Room </a>
          <a href="/match"> Match </a>
          <a href="/account"> Account </a>
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
        <Container>
          <Navbar>
            <Navbar.Brand href="/dashboard"> Pomopal </Navbar.Brand>
            {this.buildAvatarAndDropdown()}
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

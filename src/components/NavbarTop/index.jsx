import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Navbar } from 'react-bootstrap';
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
    const { avatar, nickName } = this.props.user.profile;
    return(
      <div className="navbar-container">
        <Container>
          <Navbar>
            <Navbar.Brand href="/dashboard"> Pomopal </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="username">
                { nickName }
              </Navbar.Text>
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
                           <a href="/room"> Room </a>
                           <a href="/match"> Match </a>
                           <a href="/account"> Account </a>
                           <a href="/" onClick={this.handleLogout}> Sign out </a>
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

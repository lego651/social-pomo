import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHandsHelping, faFileAlt, faTags, faTachometerAlt, faDoorOpen, faCog, faKey, faClock } from '@fortawesome/free-solid-svg-icons';
import default_img from '../../assets/img/avatar.svg';

// Actions 
import { addTodo } from '../../actions';

// Styles
import './style.scss';
import Dashboard from '../../pages/Dashboard';

class NavLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
    this.navLinks = [
      {link: "/home", icon: <FontAwesomeIcon icon={faHome} />, name: "Home"},
      {link: "/dashboard", icon: <FontAwesomeIcon icon={faTachometerAlt} />, name: "Dashboard"},
      {link: "/match", icon: <FontAwesomeIcon icon={faHandsHelping} />, name: "Match"},
      {link: "/room", icon: <FontAwesomeIcon icon={faDoorOpen} />, name: "Room"},
      {link: "/solo", icon: <FontAwesomeIcon icon={faClock} />, name: "Solo"},
      {link: "/project", icon: <FontAwesomeIcon icon={faFileAlt} />, name: "Projects"},
    ]
    this.userLinks = [
      {link: "/account", icon: <FontAwesomeIcon icon={faCog} />, name: "Account"},
      {link: "/password", icon: <FontAwesomeIcon icon={faKey} />, name: "Password"},
    ]
  }

  buildNavLinks = (links) => {
    return (
      links.map(({link, icon, name}, i) => 
        <li>
          <NavLink to={link} activeClassName="active">
            <span>{icon}</span>
            <span className="nav">{name}</span>
          </NavLink>
        </li>
      ) 
    )
  }

  render(){
    const { avatar, nickName, handle } = this.props.user.profile;
    const shownName = nickName === null ? handle : nickName;
    return(
      <div className="navleft-container">
        <div className="user">
          { avatar ? <img src={avatar} alt="avatar" /> : <img src={default_img} alt="avatar" />}
          { shownName ? <p> { shownName } </p> : <p> &nbsp; </p> }
        </div>
        <ul className="navs">
          {this.buildNavLinks(this.navLinks)}
          <hr />
          {this.buildNavLinks(this.userLinks)}
        </ul>
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
)(NavLeft);

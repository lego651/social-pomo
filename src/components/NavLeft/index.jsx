import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { Container, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { faFileAlt, faTags, faTachometerAlt, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import Icon from '@mdi/react';
import { mdiTagOutline } from '@mdi/js';

import './style.scss';
import { addTodo } from '../../actions';
import avatar from '../../assets/img/default_avatar.jpg';
// import { addMessage } from '../../actions';

class NavLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }
  render(){
    return(
      <div className="navleft-container">
        <div className="navleft-user">
          <img src={avatar} alt="avatar" />
          <p> Jason Gao </p>
        </div>
        <ul className="navs">
          <li>
            <NavLink to={"/overview"}
                     activeClassName="active">
              <span><FontAwesomeIcon icon={faTachometerAlt} /></span>
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink to={"/room"}
                     activeClassName="active">
              <span><FontAwesomeIcon icon={faDoorOpen} /></span>
              Room
            </NavLink>
          </li>
          <li>
            <NavLink to={"/project"}>
              <span><FontAwesomeIcon icon={faFileAlt} /></span>
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink to={"/tags"}>
              <span><FontAwesomeIcon icon={faTags} /></span>
              Tags
            </NavLink>
          </li>
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

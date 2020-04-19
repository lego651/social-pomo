import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHandsHelping, faFileAlt, faTags, faTachometerAlt, faDoorOpen, faCog, faKey } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { addTodo } from '../../actions';
import default_img from '../../assets/img/avatar.svg';
class NavLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }
  render(){
    const { avatar, nickName, handle } = this.props.user.profile;
    const shownName = nickName === null ? handle : nickName;
    return(
      <div className="navleft-container">
        <div className="navleft-user">
          { avatar ? <img src={avatar} alt="avatar" /> : <img src={default_img} alt="avatar" />}
          { shownName ? <p> { shownName } </p> : <p> &nbsp; </p> }
        </div>
        <ul className="navs">
          <li>
            <NavLink to={"/home"}
                     activeClassName="active">
              <span><FontAwesomeIcon icon={faHome} /></span>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard"}
                     activeClassName="active">
              <span><FontAwesomeIcon icon={faTachometerAlt} /></span>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/match"}
                     activeClassName="active">
              <span><FontAwesomeIcon icon={faHandsHelping} /></span>
              Match
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
            <NavLink to={"/tag"}>
              <span><FontAwesomeIcon icon={faTags} /></span>
              Tags
            </NavLink>
          </li>
          <hr />
          <li>
            <NavLink to={"/account"}>
              <span><FontAwesomeIcon icon={faCog} /></span>
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink to={"/password"}>
              <span><FontAwesomeIcon icon={faKey} /></span>
              Password
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

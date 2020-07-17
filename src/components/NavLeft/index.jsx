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
        <div className="user">
          { avatar ? <img src={avatar} alt="avatar" /> : <img src={default_img} alt="avatar" />}
          { shownName ? <p> { shownName } </p> : <p> &nbsp; </p> }
        </div>
        <ul className="navs">
          <li>
            <NavLink to={"/home"}
                     activeClassName="active">
              <span><FontAwesomeIcon icon={faHome} /></span>
              <span className="nav">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard"}
                     activeClassName="active">
              <span><FontAwesomeIcon icon={faTachometerAlt} /></span>
              <span className="nav">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/match"}
                     activeClassName="active">
              <span><FontAwesomeIcon icon={faHandsHelping} /></span>
              <span className="nav">Match</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/room"}
                     activeClassName="active">
              <span><FontAwesomeIcon icon={faDoorOpen} /></span>
              <span className="nav">Rome</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/solo"}
                     activeClassName="active">
              <span><FontAwesomeIcon icon={faClock} /></span>
              <span className="nav">Solo</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/project"}>
              <span><FontAwesomeIcon icon={faFileAlt} /></span>
              <span className="nav">Projects</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/tag"}>
              <span><FontAwesomeIcon icon={faTags} /></span>
              <span className="nav">Tags</span>
            </NavLink>
          </li>
          <hr />
          <li>
            <NavLink to={"/account"}>
              <span><FontAwesomeIcon icon={faCog} /></span>
              <span className="nav">Account</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/password"}>
              <span><FontAwesomeIcon icon={faKey} /></span>
              <span className="nav">Password</span>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../utils/firebase.js';

// Components
import { Container, Row, Col } from 'react-bootstrap';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';

// Images
import default_img from '../../assets/img/avatar.svg';

// Actions
import { logoutUser, getWeeklyPomo } from '../../actions';

// Styles
import './style.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('pomos');
    this.unsubscribe = null;
    this.state = {
      pomos: []
    }
  }

  componentDidMount() {
    this.unsubscribe = this.ref.orderBy("createdAt", "desc").onSnapshot(this.onUpdatePomos);
  }

  onUpdatePomos = (snapshot) => {
    const pomos = [];
    snapshot.forEach((doc) => {
      if(doc.data().public) {
        pomos.push(doc.data());
      }
    })
    this.setState({ pomos });
  }

  buildPomoList() {
    const { pomos } = this.state;
    return (
      <div className="pomo-list">
        {
          pomos.map(pomo => this.buildPomo(pomo))
        }
      </div>
    )
  }

  buildPomo(pomo) {
    const { avatar, nickName, content, handle, createdAt } = pomo;
    return (
      <div className="pomo" key={handle+createdAt}> 
        <div className="left">
          { avatar ? <img src={avatar} alt="avatar" /> : <img src={default_img} alt="avatar" />}
        </div>
        <div className="right">
          <div className="name">
            { nickName }
          </div>
          <div className="content">
            <span role="img" aria-label="check"> ✅</span>{ content }
          </div>
        </div>
      </div>
    )
  }

  buildContent = () => {
    return (
      <div className="home-body">
        <h3> Home </h3>
        { this.buildPomoList() }
      </div>
    )
  }

  render() {
    return(
      <div className="home-container">
        <NavbarTop />
        <div className="body-container">
          <NavLeft />
          {this.buildContent()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  pomo: state.pomo
});

export default connect(
  mapStateToProps,
  { logoutUser, getWeeklyPomo }
)(Home);


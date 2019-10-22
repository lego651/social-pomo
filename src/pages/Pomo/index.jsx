import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Button, Container, Row, Col, Jumbotron } from 'react-bootstrap';

import './style.scss';
import { logoutUser } from '../../actions';

class Pomo extends Component {
  handleClick = (e) => {
    this.props.logoutUser();
  }
  componentDidMount() {
    this.props.getPomos();
  }
  render(){
    return(
      <div className="pomo-container">
        <Container>
          <Row>

          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  pomo: state.pomo,
  UI: state.UI
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Pomo);

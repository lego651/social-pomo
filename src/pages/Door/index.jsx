import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Alert } from 'react-bootstrap';

import { joinRoom, clearErrors } from '../../actions';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';
import InRoom from './InRoom';
import JoinRoom from './JoinRoom';
import CreateRoom from './CreateRoom';
import LoadingModal from '../../components/LoadingModal';
import './style.scss';

class Door extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      errors : {},
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
        show: true
      });
    }
  }
  closeErrors = () => {
    this.setState({
      show: false,
      errors: {}
    })
    this.props.clearErrors();
  }
  _onJoinRoom = (roomObj, history) => {
    if(roomObj !== null) {
      this.props.joinRoom(roomObj, history);
    }
  }
  render(){
    const _history = this.props.history;
    const { inRoom } = this.props.user.profile;
    const { errors } = this.state;
    return(
      <div className="door-container">
        <NavbarTop />
        <Container>
          {
            this.state.show &&
            <Alert variant="danger" onClose={() => this.closeErrors()} dismissible>
              <p>
                { errors.fail }
              </p>
            </Alert>
          }
          <Row>
            <Col xs="3">
              <NavLeft />
            </Col>
            <Col xs="9">
              <div className="door-header">
                <h3> Room </h3>
              </div>
              <Row>
                {
                  inRoom !== null
                  ?
                  <Col>
                    <InRoom roomName={inRoom} />
                  </Col>
                  :
                  <Col>
                    <JoinRoom history={_history}
                    />
                  </Col>
                }
                <Col>
                  <CreateRoom history={_history} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <LoadingModal show={this.props.UI.loading} />
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
  { joinRoom, clearErrors }
)(Door);

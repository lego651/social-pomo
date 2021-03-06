import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Alert, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';
import NavLeftMobile from '../../components/NavLeftMobile/navLeftMobile.jsx';
import InRoom from './InRoom';
import JoinRoom from './JoinRoom';
import CreateRoom from './CreateRoom';
import LoadingModal from '../../components/LoadingModal';
import './style.scss';

// actions
import { joinRoom, clearErrors, deleteRoom } from '../../actions';

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

  _removeOwnsRoom = (history, roomName) => {
    this.props.deleteRoom(history, roomName);
  }

  buildContent = () => {
    const _history = this.props.history;
    const { inRoom, ownsRoom } = this.props.user.profile;
    const { errors } = this.state;

    return (
      <div className="content">
        <Container>
          {
            this.state.show &&
            <Alert variant="danger" onClose={() => this.closeErrors()} dismissible>
              <p>
                { errors.fail }
              </p>
            </Alert>
          }
          
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
          {
            ownsRoom &&
            <div className="owns-room-table">
              <Table>
                <thead>
                  <tr>
                    <th xs="3"> Your Room </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> {ownsRoom} </td>
                    <td>
                      <Button
                        className="delete-button"
                        onClick={() => this._removeOwnsRoom(_history, ownsRoom)}
                        >
                        <span><FontAwesomeIcon icon={faTrashAlt} /></span>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          }
        </Container>
      </div>
    )
  }

  render(){
    return (
      <div className="door-container">
        <NavbarTop />
        <div className="body-container">
          <NavLeft />
          <NavLeftMobile />
          {this.buildContent()}
          <LoadingModal show={this.props.UI.loading} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapDispatchToProps = (dispatch) => ({
  joinRoom: (roomObj, history) => dispatch(joinRoom(roomObj, history)),
  clearErrors: () => dispatch(clearErrors()),
  deleteRoom: (history, roomName) => dispatch(deleteRoom(history, roomName)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Door);

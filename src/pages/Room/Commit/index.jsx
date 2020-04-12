import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { Button, ButtonToolbar, OverlayTrigger, Tooltip } from 'react-bootstrap';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroom, faSignOutAlt, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// Styles
import './style.scss';

// actions 
import { deleteMessages, deleteRoom } from '../../../actions';

class Commit extends Component {
  deleteMessages = (roomname) => {
    this.props.deleteMessages(roomname);
  }

  deleteRoom = (history, roomname) => {
    this.props.deleteRoom(history, roomname);
  }

  render() {
    const { roomName, isOwner, history } = this.props;
    return (
      <div className="commit-container">
        <ButtonToolbar>
          {
            isOwner
            ?
            <OverlayTrigger
              key="delete"
              placement="top"
              overlay={
                <Tooltip id="delete">
                  Delete Room
                </Tooltip>
              }
            >
              <Button
                id="clear"
                variant="secondary"
                onClick={() => this.deleteRoom(history, roomName)}>
                <FontAwesomeIcon className="icon" icon={faTrashAlt} />
              </Button>
            </OverlayTrigger>
            :
            null
          }
          {
            isOwner
            ?
            <OverlayTrigger
              key="clear"
              placement="top"
              overlay={
                <Tooltip id="clear">
                  Clear Messages
                </Tooltip>
              }
            >
              <Button
                id="clear"
                variant="secondary"
                onClick={() => this.deleteMessages(roomName)}>
                <FontAwesomeIcon className="icon" icon={faBroom} />
              </Button>
            </OverlayTrigger>
            :
            null
          }
          <OverlayTrigger
            key="leave"
            placement="top"
            overlay={
              <Tooltip id="leave">
                Leave Room
              </Tooltip>
            }
          >
            <Button
              id="leave"
              variant="secondary"
              onClick={() => this.props.onLeave()}>
                <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            key="commit"
            placement="top"
            overlay={
              <Tooltip id="commit">
                New Commit
              </Tooltip>
            }
          >
            <Button
              id="commit"
              variant="secondary"
              onClick={() => this.props.onOpenModal()}>
                <FontAwesomeIcon className="icon" icon={faPencilAlt} />
            </Button>
          </OverlayTrigger>
        </ButtonToolbar>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  username: state.user.profile.handle,
  UI: state.UI
})

const mapDispatchToProps = (dispatch) => ({
  deleteMessages: (roomname) => dispatch(deleteMessages(roomname)),
  deleteRoom: (history, roomname) => dispatch(deleteRoom(history, roomname)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Commit);

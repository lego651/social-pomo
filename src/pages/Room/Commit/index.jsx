import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { Button, ButtonToolbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import DeleteRoomModal from "../DeleteRoomModal.jsx";

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroom, faSignOutAlt, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// Styles
import './style.scss';

// actions 
import { deleteMessages, deleteRoom } from '../../../actions';

class Commit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteRoomModal: false,
    };
  }

  setModalShow = (bool) => {
    this.setState({
      showDeleteRoomModal: bool
    })
  }

  deleteMessages = () => {
    const { roomName } = this.props;
    this.props.deleteMessages(roomName);
  }

  deleteRoom = () => {
    const { roomName, history } = this.props;
    this.props.deleteRoom(history, roomName);
  }

  render() {
    const { isOwner } = this.props;
    return (
      <>
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
                onClick={() => this.setModalShow(true)}>
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
                onClick={this.deleteMessages}>
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
      <DeleteRoomModal
        show={this.state.showDeleteRoomModal}
        onDelete={this.deleteRoom}
        onClose={() => this.setModalShow(false)}
      />
      </>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { Table, Button, Alert } from 'react-bootstrap';
import MyModal from '../../components/MyModal';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';
import NavLeftMobile from '../../components/NavLeftMobile/navLeftMobile.jsx';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// Actions
import { addTag, removeTag, clearErrors } from '../../actions';

// Styles
import './style.scss';

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    }
  }

  setModalShow = (bool) => {
    this.setState({
      modalShow: bool
    })
  }

  addTag = (tag) => {
    this.props.addTag(tag);
  }

  removeTag = (tag) => {
    this.props.removeTag(tag.trim());
  }

  clearErrors = () => {
    this.props.clearErrors();
  }

  buildAlert = () => {
    const { errors } = this.props.UI;
    return (
      errors &&
      <Alert variant="danger" onClose={() => this.clearErrors()} dismissible>
        <p>
          { errors.tag }
        </p>
      </Alert>
    )
  }

  buildTagTable = () => {
    const { tags } = this.props.user.profile;
    return (
      <>
        <div className="tag-header">
          <h3> Tags </h3>
        </div>
        <div>
          <Button
            variant="primary"
            className= "create-button"
            onClick={() => this.setModalShow(true)}
          >
            + Add New Tag
          </Button>
        </div>
        <div className="tag-table">
          <Table>
            <thead>
              <tr>
                <th xs="3"> Tag Name </th>
                <th xs="4"> Delete </th>
              </tr>
            </thead>
            <tbody>
              {
                tags && tags.map((tag, index) => {
                  return (
                    <tr key={index}>
                      <td><p> { tag } </p></td>
                      <td>
                        <Button
                          className="delete-button"
                          onClick={() => { this.removeTag(tag)} }
                          >
                          <span><FontAwesomeIcon icon={faTrashAlt} /></span>
                        </Button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>
        <MyModal
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
          onCreate={(tag) => this.addTag(tag)}
          title={"Create new tag"}
          placeholder={"Enter tag name"}
        />
      </>
    )
  }

  buildContent = () => {
    return (
      <div className="content">
        { this.buildAlert() }
        { this.buildTagTable() }
      </div>
    )
  }
  
  render(){
    return (
      <div className="tag-container">
        <NavbarTop />
        <div className="body-container">
          <NavLeft />
          <NavLeftMobile />
          {this.buildContent()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});
export default connect(
  mapStateToProps,
  { addTag, removeTag, clearErrors }
)(Tag);


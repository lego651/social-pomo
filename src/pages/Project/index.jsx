import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { Table, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';
import NavLeftMobile from '../../components/NavLeftMobile/navLeftMobile.jsx';
import MyModal from '../../components/MyModal';

// Actions
import { addProject, removeProject, clearErrors } from '../../actions';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// Styles
import './style.scss';

class Project extends Component {
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

  addProject = (project) => {
    this.props.addProject(project);
  }

  removeProject = (project) => {
    this.props.removeProject(project.trim());
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
          { errors.project }
        </p>
      </Alert>
    )
  }

  buildProjectTable = () => {
    const { projects } = this.props.user.profile;
    return (
      <>
        <div className="project-header">
          <h3> Projects </h3>
        </div>
        <div>
          <Button
            variant="primary"
            className= "create-button"
            onClick={() => this.setModalShow(true)}
          >
            + Create New Project
          </Button>
        </div>
        <div className="project-table">
          <Table>
            <thead>
              <tr>
                <th xs="3"> Project Name </th>
                <th xs="4"> Delete </th>
              </tr>
            </thead>
            <tbody>
              {
                projects && projects.map((project, index) => {
                  return (
                    <tr key={index}>
                      <td><p> { project } </p></td>
                      <td>
                        {
                          index === 0
                          ? null
                          : <Button
                              className="delete-button"
                              onClick={() => { this.removeProject(project)} }
                              >
                              <span><FontAwesomeIcon icon={faTrashAlt} /></span>
                            </Button>
                        }
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
          onCreate={(project) => this.addProject(project)}
          title={"Create new project"}
          placeholder={"Enter project name"}
        />
      </>
    )
  }

  buildContent = () => {
    return (
      <div className="content">
        { this.buildAlert() }
        { this.buildProjectTable() }
      </div>
    )
  }

  render(){
    return (
      <div className="project-container">
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
  { addProject, removeProject, clearErrors }
)(Project);

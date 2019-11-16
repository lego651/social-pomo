import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import MyModal from '../../components/MyModal';
import { addProject, removeProject } from '../../actions';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';
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
    console.log('data is ', project);
    this.props.removeProject(project.trim());
  }
  render(){
    console.log(this.props.user.profile.projects);
    const { projects } = this.props.user.profile;
    return(
      <div className="project-container">
      <NavbarTop />
      <Container>
        <Row>
          <Col xs="3">
            <NavLeft />
          </Col>
          <Col xs="9">
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
                          <td> {project} </td>
                          <td>
                            <Button
                              className="delete-button"
                              onClick={() => { this.removeProject(project)} }
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
              onCreate={(project) => this.addProject(project)}
            />
          </Col>
        </Row>
      </Container>
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
  { addProject, removeProject }
)(Project);

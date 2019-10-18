import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';

import './style.scss';
import MyModal from '../../components/MyModal';
import { addProject, removeProject } from '../../actions';

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
        <Container>
          Project
          <div>
            <Button
              variant="outline-primary"
              onClick={() => this.setModalShow(true)}
            >
              + Create New Project
            </Button>
          </div>
          <div className="project-table">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th> Project Name </th>
                  <th> Delete </th>
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
                            onClick={() => { this.removeProject(project)} }
                            variant="outline-danger">
                            X
                          </Button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </div>
        </Container>
        <MyModal
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
          onCreate={(project) => this.addProject(project)}
        />
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

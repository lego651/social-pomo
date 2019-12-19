import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';

import './style.scss';
import { createPomo, removeTodo, addProject, clearErrors, clearSuccess, addTag } from '../../../actions';

class PomoModalTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      project: 'Other',
      tag: [],
      addProject: false,
      addTag: false,
      newProject: '',
      newTag: ''
    }
  }
  openAddProject = () => {
    this.setState({
      addProject: true
    })
  }
  closeAddProject = () => {
    this.setState({
      addProject: false
    })
  }
  openAddTag = () => {
    this.setState({
      addTag: true
    })
  }
  closeAddTag = () => {
    this.setState({
      addTag: false
    })
  }
  addNewProject = () => {
    if(this.state.newProject.length > 0) {
      this.props.addProject(this.state.newProject);
    }
  }
  addNewTag = () => {
    if(this.state.newTag.length > 0) {
      this.props.addTag(this.state.newTag);
    }
  }
  handleChange = (e) => {
    this.props.clearSuccess();
    this.props.clearErrors();
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleMultiChange = (e) => {
    this.props.clearSuccess();
    this.props.clearErrors();
    this.setState({
      tag: Array.from(e.target.selectedOptions, (item) => item.value)
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const newContent = this.state.content.length > 0 ? this.state.content : this.props.user.todo;
    const newPomo = {
      content: newContent,
      project: this.state.project,
      tag: this.state.tag
    }
    console.log(newPomo);
    // this.props.onCreate(this.state.project);
    this.props.createPomo(newPomo);
    this.props.removeTodo();
    this.props.onHide();
  }
  render() {
    const { projects, tags } = this.props.user.profile;
    const content = this.props.user.todo;
    const { errors, success } = this.props.UI;
    // const { errors } = this.state;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="pomo-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add to history pomo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={ (e) => {this.handleSubmit(e)} }>
          <Form.Group controlId="formBasicEmail">
            <Form.Label> What did you accomplish? </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your task"
              defaultValue={content}
              name="content"
              onChange={(e) => {this.handleChange(e)}}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>
              Select project
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {errors && errors.project}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              {success && success.project}
            </Form.Control.Feedback>
            <Form.Control as="select"
                          name="project"
                          onChange={(e) => {this.handleChange(e)}}>
              {
                projects && projects.map((p, i) =>
                  <option key={i}> {p} </option>
                )
              }
            </Form.Control>

            {
              this.state.addProject
              ?
              <div className="add-project-wrapper">
                <span
                  className="hidden-btn"
                  onClick={() => {this.addNewProject()}}>
                  + Create project
                </span>
                <input type="text"
                       placeholder="Enter project name"
                       name="newProject"
                       onChange={(e) => {this.handleChange(e)}}
                       />
                 <span
                   className="hidden-btn cancel"
                   onClick={() => this.closeAddProject()}>
                   Cancel
                 </span>
              </div>
              :
              <div className="add-project-wrapper create">
                <span
                  className="hidden-btn"
                  onClick={() => this.openAddProject()}>
                  Create new project
                </span>
              </div>
            }
          </Form.Group>


          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Control.Feedback type="invalid">
              {errors && errors.tag}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              {success && success.tag}
            </Form.Control.Feedback>
            <Form.Label> Select tag </Form.Label>
            <Form.Control as="select"
                          multiple
                          name="tag"
                          onChange={(e) => {this.handleMultiChange(e)}}>
            {
              tags && tags.map((t, i) =>
                <option key={i}> {t} </option>
              )
            }
            </Form.Control>
            {
              this.state.addTag
              ?
              <div className="add-tag-wrapper">
                <span
                  className="hidden-btn"
                  onClick={() => {this.addNewTag()}}>
                  + Create tag
                </span>
                <input type="text"
                       placeholder="Enter tag name"
                       name="newTag"
                       onChange={(e) => {this.handleChange(e)}}
                       />
                 <span
                   className="hidden-btn cancel"
                   onClick={() => this.closeAddTag()}>
                   Cancel
                 </span>
              </div>
              :
              <div className="add-tag-wrapper create">
                <span
                  className="hidden-btn"
                  onClick={() => this.openAddTag()}>
                  Create new tag
                </span>
              </div>
            }
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}> Cancel </Button>
          <Button onClick={this.handleSubmit}> Submit </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { createPomo, removeTodo, addProject, clearErrors, clearSuccess, addTag }
)(PomoModalTest);

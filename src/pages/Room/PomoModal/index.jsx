import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import { Modal, Button, Form } from "react-bootstrap";

// css
import "./style.scss";

// actions
import {
  createPomo,
  removeTodo,
  addProject,
  clearErrors,
  clearSuccess,
  addTag
} from "../../../actions";

// utils
import { convertDateToSeq } from "../../../utils/util.js";

class PomoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      public: true,
      project: "Other",
      tag: [],
      addProject: false,
      addTag: false,
      newProject: "",
      newTag: ""
    };
  }

  openAddProject = () => {
    this.setState({
      addProject: true
    });
  };

  closeAddProject = () => {
    this.setState({
      addProject: false
    });
  };

  openAddTag = () => {
    this.setState({
      addTag: true
    });
  };

  closeAddTag = () => {
    this.setState({
      addTag: false
    });
  };

  addNewProject = () => {
    if (this.state.newProject.length > 0) {
      this.props.addProject(this.state.newProject);
    }
  };

  addNewTag = () => {
    if (this.state.newTag.length > 0) {
      this.props.addTag(this.state.newTag);
    }
  };

  handleChange = e => {
    this.props.clearSuccess();
    this.props.clearErrors();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  toggleChecked = () => {
    this.setState({
      public: !this.state.public
    })
  }

  handleMultiChange = e => {
    this.props.clearSuccess();
    this.props.clearErrors();
    this.setState({
      tag: Array.from(e.target.selectedOptions, item => item.value)
    });
  };

  handleSubmit = e => {
    const { createPomo, removeTodo, onHide, type, time } = this.props;
    const { avatar, nickName } = this.props.user.profile;
    e.preventDefault();
    const newContent =
      this.state.content.length > 0 ? this.state.content : this.props.user.todo;
    const dateObj = new Date();
    const y = dateObj.getFullYear();
    const m = dateObj.getMonth();
    const d = dateObj.getDate();
    const s = convertDateToSeq(y, m + 1, d);
    const newPomo = {
      content: newContent,
      project: this.state.project,
      tag: this.state.tag,
      public: this.state.public,
      month: m + 1,
      date: d,
      day: dateObj.getDay(),
      hour: dateObj.getHours(),
      minute: dateObj.getMinutes(),
      seq: s,
      nickName,
      avatar,
      type,
      time 
    };
    createPomo(newPomo);
    removeTodo();
    onHide();
  };

  buildEnterTask = () => {
    const content = this.props.user.todo;
    return (
      <Form.Group controlId="enterTask">
        <Form.Label> What did you accomplish? </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your task"
          defaultValue={content}
          name="content"
          onChange={e => {
            this.handleChange(e);
          }}
        />
      </Form.Group>
    )
  }

  buildSelectProject = () => {
    const { projects } = this.props.user.profile;
    const { errors, success } = this.props.UI;
    return (
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Select project</Form.Label>
          <Form.Control.Feedback type="invalid">
            {errors && errors.project}
          </Form.Control.Feedback>
          <Form.Control.Feedback type="valid">
            {success && success.project}
          </Form.Control.Feedback>
          <Form.Control
            as="select"
            name="project"
            onChange={e => {
              this.handleChange(e);
            }}
          >
            {projects &&
              projects.map((p, i) => <option key={i}> {p} </option>)}
          </Form.Control>

          {this.state.addProject ? (
            <div className="add-project-wrapper">
              <input
                type="text"
                className="text"
                placeholder="Enter project name"
                name="newProject"
                onChange={e => {
                  this.handleChange(e);
                }}
              />
              <span
                className="hidden-btn"
                onClick={() => {
                  this.addNewProject();
                  this.closeAddProject();
                }}
              >
                Add
              </span>
              <span
                className="hidden-btn cancel"
                onClick={() => this.closeAddProject()}
              >
                Cancel
              </span>
            </div>
          ) : (
            <div className="add-project-wrapper create">
              <span
                className="hidden-btn"
                onClick={() => this.openAddProject()}
              >
                Create new project
              </span>
            </div>
          )}
        </Form.Group>
    )
  }

  buildSelectTag = () => {
    const { tags } = this.props.user.profile;
    const { errors, success } = this.props.UI;
    return (
      <Form.Group controlId="exampleForm.ControlSelect2">
        <Form.Control.Feedback type="invalid">
          {errors && errors.tag}
        </Form.Control.Feedback>
        <Form.Control.Feedback type="valid">
          {success && success.tag}
        </Form.Control.Feedback>
        <Form.Label> Select tag </Form.Label>
        <Form.Control
          as="select"
          multiple
          name="tag"
          onChange={e => {
            this.handleMultiChange(e);
          }}
        >
          {tags && tags.map((t, i) => <option key={i}> {t} </option>)}
        </Form.Control>
        {this.state.addTag ? (
          <div className="add-tag-wrapper">
            <input
              type="text"
              className="text"
              placeholder="Enter tag name"
              name="newTag"
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <span
              className="hidden-btn"
              onClick={() => {
                this.addNewTag();
              }}
            >
              Add
            </span>
            <span
              className="hidden-btn cancel"
              onClick={() => this.closeAddTag()}
            >
              Cancel
            </span>
          </div>
        ) : (
          <div className="add-tag-wrapper create">
            <span
              className="hidden-btn"
              onClick={() => this.openAddTag()}
            >
              Create new tag
            </span>
          </div>
        )}
      </Form.Group>
    )
  }

  buildSetPublic = () => {
    return (
      <Form.Group controlId="setPubilc">
        <Form.Label> Share to public </Form.Label>
        <Form.Check 
          type="checkbox" 
          checked={this.state.public}
          label="Visible to Public"
          onChange={this.toggleChecked}
          name="check" />
      </Form.Group>
    )
  }

  buildForm = () => {
    return (
      <Form onSubmit={e =>{this.handleSubmit(e)}}>
        {this.buildEnterTask()}
        {this.buildSelectProject()}
        {this.buildSelectTag()}
        {this.buildSetPublic()}
      </Form>
    )
  }

  render() {
    console.log(this.state.public);
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="pomo-modal"
        show={this.props.show}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add to history
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.buildForm()}
        </Modal.Body>
        <Modal.Footer>
          <Button id="close" onClick={this.props.onHide} variant="secondary"> Cancel </Button>
          <Button onClick={this.handleSubmit}> Submit </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps, {
  createPomo,
  removeTodo,
  addProject,
  clearErrors,
  clearSuccess,
  addTag
})(PomoModal);

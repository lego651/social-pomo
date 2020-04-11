import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';

class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      errors: {}
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onCreate(this.state.content);
    this.props.onHide();
  }

  render() {
    // const { errors } = this.state;
    const { errors } = this.props.UI;
    const { title, placeholder } = this.props;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            { title }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder={ placeholder }
                name="content"
                onChange={(e) => {this.handleChange(e)}}
                isInvalid={errors && !!errors.project}
              />
              <Form.Control.Feedback type="invalid">
                {errors && errors.project}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
          <Button onClick={this.handleSubmit}> Create </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  null
)(MyModal);

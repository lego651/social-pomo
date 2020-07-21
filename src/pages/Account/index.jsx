import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faEdit } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
// import MyModal from '../../components/MyModal';
import { updateNickName, clearSuccess, uploadImage } from '../../actions';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';
import NavLeftMobile from '../../components/NavLeftMobile/navLeftMobile.jsx';

class Account extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      nickName: props.user.profile.nickName || '',
      show: false,
      errors: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.success) {
      this.setState({
        success: nextProps.UI.success,
        show: true
      });
    }
  }

  closeSuccess = () => {
    this.setState({
      show: false,
      success: null
    })
    this.props.clearSuccess();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state.nickName);
    // if(this.state.nickName.length > 0) {
    //   this.props.updateNickName(this.state.nickName);
    // }
    if(this.state.nickName.length === 0) {
      const errors = {
        nickName: 'It must not be empty.'
      }
      this.setState({
        errors
      })
    } else {
      this.props.updateNickName(this.state.nickName);
      this.setState({
        errors: {},
      })
    }
  }

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  // componentDidUpdate(nextProps) {
  //   if(nextProps.user.profile.nickName !== this.state.nickName) {
  //     this.setState({
  //       nickName: nextProps.user.profile.nickName
  //     })
  //   }
  // }

  buildContent = () => {
    const { email, handle, avatar, nickName } = this.props.user.profile;
    const { loading, success } = this.props.UI;
    const { errors } = this.state;

    return (
      <div className="content">
        {
          this.state.show &&
          <Alert variant="success" onClose={() => this.closeSuccess()} dismissible>
            <p>
              { success }
            </p>
          </Alert>
        }
      
        <h3> My Account </h3>
        <div className="account-body">
          <div className="account-avatar">
            <img src={avatar} alt="avatar" />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={this.handleImageChange}
            />
            <span onClick={() => this.handleEditPicture()}>Edit</span>
          </div>
          <Form onSubmit={(e) => {this.handleSubmit(e)}}>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="email" placeholder={email} disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPassword">
              <Form.Label column sm={2}>
                Username
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" placeholder={handle} disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPassword">
              <Form.Label column sm={2}>
                Nickname
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="nickName"
                  onChange={(e) => {this.handleChange(e)}}
                  placeholder={nickName}
                  isInvalid={!!errors.nickName}
                  value={this.state.nickName || ''}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nickName}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button
                  variant="success"
                  type="submit">
                  { loading
                      ? <FontAwesomeIcon className="icon" icon={faSync} spin />
                      : <FontAwesomeIcon className="icon" icon={faEdit} />
                  }
                  <span> Save </span>
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
    )
  }

  render(){
    return (
      <div className="account-container">
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
  { updateNickName, clearSuccess, uploadImage }
)(Account);

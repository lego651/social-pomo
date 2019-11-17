import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import './style.scss';
// import MyModal from '../../components/MyModal';
import { updateNickName } from '../../actions';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';

class Account extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      nickName: props.user.profile.nickName,
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.nickName);
    if(this.state.nickName.length > 0) {
      this.props.updateNickName(this.state.nickName);
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
  render(){
    const { email, handle, avatar, nickName } = this.props.user.profile;
    return(
      <div className="account-container">
        <NavbarTop />
        <Container>
          <Row>
            <Col xs="3">
              <NavLeft />
            </Col>
            <Col xs="9">
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
                        value={this.state.nickName || ''} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Button type="submit"> Save </Button>
                    </Col>
                  </Form.Group>
                </Form>
              </div>
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
  { updateNickName }
)(Account);

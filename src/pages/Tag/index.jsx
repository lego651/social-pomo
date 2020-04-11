import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import MyModal from '../../components/MyModal';
import NavbarTop from '../../components/NavbarTop';
import NavLeft from '../../components/NavLeft';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// Actions
import { addTag, removeTag } from '../../actions';

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

  buildTagTable = () => {
    const { tags } = this.props.user.profile;
    return (
      <>
        <div className="project-header">
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
        <div className="project-table">
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
                      <td> {tag} </td>
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
        />
      </>
    )
  }

  render(){
    return(
      <div className="tag-container">
        <NavbarTop />
        <Container>
          <Row>
            <Col xs="3">
              <NavLeft />
            </Col>
            <Col xs="9">
              { this.buildTagTable() }
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
  { addTag, removeTag }
)(Tag);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Button, Container, Row, Col, Jumbotron } from 'react-bootstrap';

import { logoutUser } from '../../actions';
import CreateRoom from '../../components/CreateRoom';
import JoinRoom from '../../components/JoinRoom';
import './style.scss';

class Profile extends Component {
  handleClick = (e) => {
    this.props.logoutUser();
  }
  render(){
    const _history = this.props.history;
    return(
      <div className="signup-container">
        <Container>
          <Row>
            <Col md={3}>
              <Badge pill variant="success"> Profile </Badge>
              {this.props.user.profile.handle}
              <Button
                variant="primary"
                onClick={() => { this.handleClick() }}>
                log out
              </Button>
              </Col>
            <Col md={9}>
              <Jumbotron>
                <CreateRoom history={_history} />
              </Jumbotron>
              <Jumbotron>
                <JoinRoom history={_history} />
              </Jumbotron>
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
  { logoutUser }
)(Profile);

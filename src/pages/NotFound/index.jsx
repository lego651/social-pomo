import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import "./style.scss";

import PageNotFound from "../../assets/img/not_found.svg";

class NotFoundPage extends React.Component {
  render() {
    return (
      <div>
        <Row className="notfound-mainbody">
          <Col className="left-content" lg="6">
            <p>404 page</p>
            <p>OOPS, Page not found!</p>
            <button className="btn-primary">
              <Link to="/dashboard">Go back to Dashboard </Link>
            </button>
          </Col>
          <Col lg="6">
            <img className="notfound-img" src={PageNotFound} alt="notFound" />
          </Col>
        </Row>
      </div>
    );
  }
}
export default NotFoundPage;

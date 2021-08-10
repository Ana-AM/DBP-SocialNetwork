import React from "react";
import { Container, Col, Row, Jumbotron, Button } from "reactstrap";
import "./styles/Form.css";

class Welcome extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">Hello, world!</h1>
          <p className="lead">
            This is a simple hero unit, a simple Jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <hr className="my-2" />
            <Button href="/logout" color="primary">Salir</Button>
        </Jumbotron>
      </div>
    );
  }
}

export default Welcome;

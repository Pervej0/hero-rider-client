import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  return (
    <section className="container">
      <div>
        <h2 className="text-center mt-4 pb-5">Get Your Package</h2>
      </div>
      <div className="row">
        <div className="col-sm-6 col-12">
          <Card style={{ width: "18rem" }} className="mx-auto">
            <Card.Header className="py-5 h5 text-center">
              $<span className="h1">200</span>
              <small className="d-block">Driving Lessons</small>
            </Card.Header>
            <ListGroup variant="flush" className="text-center">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
            <Button onClick={() => navigate("/checkout")} variant="dark">
              Buy Package
            </Button>
          </Card>
        </div>
        <div className="col-sm-6 col-12">
          <Card style={{ width: "18rem" }} className="mx-auto">
            <Card.Header className="py-5 h5 text-center">
              $<span className="h1">100</span>
              <small className="d-block">Bike Lessons</small>
            </Card.Header>
            <ListGroup variant="flush" className="text-center">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>

            <Button onClick={() => navigate("/checkout")} variant="dark">
              Buy Package
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;

import React, { useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Services = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <section className="container">
      <div>
        <h2 className="text-center mt-4 pb-5">Get Your Package</h2>
      </div>
      <div className="row">
        {data.map((item) => (
          <div className="col-sm-6 col-12" key={item._id}>
            <Card style={{ width: "20rem" }} className="mx-auto">
              <Card.Header className="py-5 h5 text-center">
                $<span className="h1">{item.price}</span>
                <small className="d-block">{item.title}</small>
              </Card.Header>
              <ListGroup variant="flush" className="text-center">
                <ListGroup.Item>{item.duration}</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
              <Button
                onClick={() => navigate(`/dashboard/checkout/${item._id}`)}
                variant="dark"
              >
                Buy Package
              </Button>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

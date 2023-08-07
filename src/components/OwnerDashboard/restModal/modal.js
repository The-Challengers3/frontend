import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

import "./modal.css";
import Form from "react-bootstrap/Form";

function ReelModal({ user }) {
  const [show, setShow] = useState(false);
  const [name, setname] = useState("");
  const [description, setDescription] = useState("");
  const [location, setlocation] = useState("");
  const [price, setprice] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addRest = async (e) => {
    const req = `${process.env.REACT_APP_SERVER_URL}restaurants`;
    const data = {
      name: name,
      description: description,
      location: location,
      price: price,
    };
    const res = await axios.post(req, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
    console.log(res.data);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Restaurant
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Restaurant Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter restaurant name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter restaurant description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter restaurant location"
                value={location}
                onChange={(e) => setlocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter restaurant price"
                value={price}
                onChange={(e) => setprice(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addRest}>
            Add Rest
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReelModal;

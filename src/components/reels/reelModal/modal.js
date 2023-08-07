import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';

import "./modal.css";
import Form from "react-bootstrap/Form";

function ReelModal({ user }) {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const test = async (e) => {
    const req = `${process.env.REACT_APP_SERVER_URL}restaurants`;
    const res = await axios.get(req)
    console.log(res.data);

  }
  const addToReels = (e) => {
    // e.preventDefault();

    // Validate required fields
    // if (!username || !selectedFile) {
    //   alert("Please fill in all required fields.");
    //   return;
    // }

    const req = `${process.env.REACT_APP_SERVER_URL}reelsUpload`;

    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("description", description);
    formData.append("video", selectedFile);



    axios
      .post(req, formData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('userToken')}`,
          "Content-Type": "multipart/form-data",
        },
      })

      .then((response) => {
        // Handle successful response here
        console.log("Upload successful:", response.data);
        handleClose(); // Close the modal after successful upload (optional)
      })
      .catch((error) => {
        // Handle error here
        console.error("Error uploading video:", error);
      });
  };
  useEffect(() => {
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Video</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addToReels}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReelModal;

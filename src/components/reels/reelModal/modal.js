import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import AddBoxIcon from '@mui/icons-material/AddBox';

import "./modal.css";
import Form from "react-bootstrap/Form";

function ReelModal({ user }) {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const addToReels = (e) => {
    const req = `${process.env.REACT_APP_SERVER_URL}reelsUpload`;

    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("description", description);
    formData.append("video", selectedFile);

    axios
      .post(req, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "multipart/form-data",
        },
      })

      .then((response) => {
        console.log("Upload successful:", response.data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error uploading video:", error);
      });
  };
  useEffect(() => {

    
  }, []);

  return (
    <>
     
<AddBoxIcon  style={{
          fontSize: 7 * 9,
          color: "white",
          cursor: "pointer",
        }}
        className="modalbutn" onClick={handleShow}
        
        />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formFile' className='mb-3'>
              <Form.Label>Upload Video</Form.Label>
              <Form.Control type='file' onChange={handleFileChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={addToReels}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReelModal;

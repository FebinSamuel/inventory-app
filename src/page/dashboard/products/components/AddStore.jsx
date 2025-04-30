import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
// import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { db } from "../../../services/firebase";
import { addDoc, collection } from "firebase/firestore";
function AddStore() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    storeName: "",
    location: "",
    phoneNumber: "",
    branchNumber: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = collection(db, "stores");
      await addDoc(data, formData);
      console.log("Form Data Saved to Firestore:", formData);
      handleClose();
      setFormData({
        storeName: "",
        location: "",
        phoneNumber: "",
        branchNumber: "",
      });
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Store
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end" style={{width:"600px"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Store</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Store Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Store Name"
                name="storeName"
                onChange={handleChange}
              />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                name="location"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Phone number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone number"
                name="phoneNumber"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Branch no.</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter branch number"
                name="branchNumber"
                onChange={handleChange}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formProduct">
              <Form.Label>Select Product</Form.Label>
              <Form.Select
               name="productStatus"
              //  value={formData.productStatus}
               onChange={handleChange}>
                <option value="In-Stock">In-Stock</option>
                <option value="Out-of-Stock">Out-of-Stock</option>
                <option value="Stopped">Stopped</option>
                {/* Add more options as needed */}
            {/* </Form.Select>
            </Form.Group> */}

            <Button variant="primary" type="submit">
              Add Store
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AddStore;

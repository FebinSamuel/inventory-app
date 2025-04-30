import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
// import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { db } from "../../../services/firebase";
import { addDoc, collection } from "firebase/firestore";
function Addsupplier() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    supplierName: "",
    product: "",
    contactNumber: "",
    email: "",
    productType: "",
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
      const assetCollectionRef = collection(db, "supplier");
      await addDoc(assetCollectionRef, formData);
      console.log("Form Data Saved to Firestore:", formData);
      handleClose();
      setFormData({
        SupplierName: "",
        product: "",
        contactNumber: "",
        address:"",
        email: "",
        productType: "",
      });
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Supplier
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end" style={{width:"600px"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Supplier</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Supplier Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Supplier name"
                name="SupplierName"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Product</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product"
                name="product"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Contact number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter  Contact number"
                name="contactNumber"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProduct">
              <Form.Label className="fw-semibold">Type</Form.Label>
              <Form.Select
                name="productType"
                //  value={formData.productStatus}
                onChange={handleChange}
              >
                <option value="" disabled selected>
                  Select a Type
                </option>
                <option value="Taking Return">Taking Return</option>
                <option value="Not Taking Return">Not Taking Return</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Addsupplier;

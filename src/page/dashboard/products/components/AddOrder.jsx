import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
// import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { db } from "../../../services/firebase";
import { addDoc, collection } from "firebase/firestore";
function AddOrder() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    quantity: "",
    total:"",
    orderId: "",
    orderPlacedDate: "",
    expectedDeliveryDate: "",
    productStatus: "",

    // Default value for product status
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
      const assetCollectionRef = collection(db, "orders");
      await addDoc(assetCollectionRef, formData);
      console.log("Form Data Saved to Firestore:", formData);
      handleClose();
      setFormData({
        productName: "",
        productPrice: "",
        quantity: "",
        total:"",
        placedOn:"",
        orderId: "",
        expectedDeliveryDate: "",
        productStatus: "",
      });
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Order
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end" style={{width:"600px"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Order</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Order ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Order Id"
                name="orderId"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Product</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                name="productName"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Product Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Price"
                name="productPrice"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantity"
                name="quantity"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Total</Form.Label>
              <Form.Control
                type="text"
                placeholder="Total"
                name="total"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Placed On</Form.Label>
              <Form.Control
                type="date"
                placeholder=""
                name="orderPlacedDate"
                onChange={handleChange}
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Expected Delivery</Form.Label>
              <Form.Control
                type="date"
                placeholder=""
                name="expectedDeliveryDate"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProduct">
              <Form.Label className="fw-semibold">Select status</Form.Label>
              <Form.Select
                name="productStatus"
                //  value={formData.productStatus}
                onChange={handleChange}
              >
                <option value="" disabled selected>
                  Select status
                </option>

                <option value="Confirmed">Confirmed</option>
                <option value="In progress">In progress</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Returned">Returned</option>
                
                {/* Add more options as needed */}
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

export default AddOrder;

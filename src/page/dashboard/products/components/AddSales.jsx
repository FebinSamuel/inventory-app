import React, { useEffect, useState } from "react";
import { Button, Col, Offcanvas, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { ToastContainer, toast } from "react-toastify";

import * as yup from "yup";
const AddSales = () => {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    orderId: "",
    customerName: "",
    itemsName: "",
    itemCost: "",
    itemSold: "",
    salesChannel: "",
    paymentMethod: "",
    salesTotal: "",
  });
  const schema = yup.object().shape({
    orderId: yup.string().required("Order ID is required"),
    customerName: yup.string().required("Customer Name is required"),
    itemsName: yup.string().required("Items Name is required"),
    itemCost: yup.number().required("Item Cost is required"),
    itemSold: yup.number().required("Items Sold is required"),
    salesChannel: yup.string().required("Sales Channel is required"),
    paymentMethod: yup.string().required("Payment Method is required"),
    salesTotal: yup.number().required("Sales Total is required"),
  });

  useEffect(() => {
    const productsRef = collection(db, "products");

    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      const productsList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(productsList);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === 'itemsName') {
      const selectedProduct = products.find(
        (product) => product.productName === value
      );
      if (selectedProduct) {
        setFormData((prevState) => ({
          ...prevState,
          itemCost: selectedProduct.sellingPrice, // Update itemCost with the selling price of the selected product
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          itemCost: '',
        }));
  };
}
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      
      // Fetch product information
      const selectedProduct = products.find(product => product.productName === formData.itemsName);
      
      if (!selectedProduct) {
        setErrorMessage("Invalid product selected");
        return;
      }
  
      if (selectedProduct.quantity < formData.itemSold) {
        setErrorMessage("Insufficient stock for the selected product");
        return;
      }
  
      // Proceed with adding the sales record
      try {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${
          today.getMonth() + 1
        }-${today.getDate()}`;
  
        const assetCollectionRef = collection(db, "sales");
        await addDoc(assetCollectionRef, {
          ...formData,
          salesDate: formattedDate,
        });
  
        // Deduct sold quantity from inventory
        const updatedQuantity = selectedProduct.quantity - formData.itemSold;
        const productDocRef = doc(db, "products", selectedProduct.id);
        await updateDoc(productDocRef, { quantity: updatedQuantity });
        toast.success("Added sales record!");
        console.log("Form Data Saved to Firestore:", formData);
        handleClose();
        setFormData({
          orderId: "",
          customerName: "",
          itemsName: "",
          phoneNumber: "",
          itemName: "",
          itemCost: "",
          itemSold: "",
          salesChannel: "",
          payment: "",
          paymentMethod: "",
          salesTotal: "",
        });
      } catch (error) {
        console.error("Error saving form data:", error);
        setErrorMessage("Error saving form data");
      }
    } catch (error) {
      console.error("Error validating form data:", error);
      setErrorMessage("Enter all required fields");
    }
  };
  

  const handleClose = () => {
    setShow(false);
    // navigate('/dashboard/sales');
    // window.location.reload();
  };
  const handleShow = () => setShow(true);

  return (
    <>
        <ToastContainer position="bottom-center" autoClose={5000} />
      <Button variant="primary" onClick={handleShow}>
        Add Sales
      </Button>
      {/* <Invoice  /> */}
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sales Record</Modal.Title>
        </Modal.Header>
        <Modal.Body> */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "600px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Sales</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            {errorMessage && (
              <p className="alert alert-danger">{errorMessage}</p>
            )}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-semibold">Order Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Order Id"
                name="orderId"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Sales Date</Form.Label>
              <Form.Control type="date" name="salesDate"  onChange={handleChange}/>
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-semibold">Customer Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Customer Name"
                name="customerName"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-semibold">Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                name="phoneNumber"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-semibold">Items Name</Form.Label>
              <Form.Control
                as="select"
                name="itemsName"
                value={formData.itemsName}
                onChange={handleChange}
              >
                <option value="">Select a product</option>
                {products.map((product, index) => (
                  <option key={index} value={product.productName}>
                    {product.productName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-semibold">Items cost</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Item Cost"
                name="itemCost"
                value={formData.itemCost}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-semibold">Items Sold</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Item Sold"
                name="itemSold"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-semibold">Sales Channel</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="salesChannel"
                onChange={handleChange}
              >
                <option selected disabled>Select Sales Channel</option>
                <option value="Online">Online</option>
                <option value="Physical Store">Physical Store</option>
                <option value="Phone Order">Phone Order</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-semibold">Payment </Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="payment"
                onChange={handleChange}
              >
                <option selected disabled>Payment</option>
                <option value="pending">Pending</option>
                <option value="Full Payment">Full Payment</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-semibold">Payment method</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="paymentMethod"
                onChange={handleChange}
              >
                <option selected disabled>Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Online Payment">Online Payment</option>
                <option value="Card payment">Card payment</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-semibold">Sales Total</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Sales Total"
                name="salesTotal"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>

          <Row className="mt-3">
            <Col className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-2"
              >
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Add Record
              </Button>
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
  
    </>
  );
};

export default AddSales;

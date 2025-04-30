import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
// import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { db } from "../../../services/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
function AddProduct() {
  const [show, setShow] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    buyingPrice: "",
    quantity: "",
    sellingPrice: "",
    supplier:"",
    productStatus: "In-Stock", // Default value for product status
  });


  useEffect(() => {
    const productsRef = collection(db, "supplier");

    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      const productsList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSuppliers(productsList);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);


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
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${
        today.getMonth() + 1
      }-${today.getDate()}`;
      const assetCollectionRef = collection(db, "products");
      await addDoc(assetCollectionRef, { ...formData, addedOn: formattedDate });
      console.log("Form Data Saved to Firestore:", formData);
      handleClose();
      setFormData({
        productName: "",
        buyingPrice: "",
        quantity: "",
        sellingPrice: "",
        supplier: "",
        productStatus: "In-Stock",
      });
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Product
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end" style={{width:"600px"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Product</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Product</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                name="productName"
                onChange={handleChange}
              />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Buying Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Buying Price"
                name="buyingPrice"
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
              <Form.Label className="fw-semibold">Selling Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Selling Price"
                name="sellingPrice"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Supplier</Form.Label>
              {/* <Form.Control
                type="text"
                placeholder="Supplier"
                name="supplier"
                onChange={handleChange}
              /> */}
               <Form.Select
                as="select"
                name="supplier"
                onChange={handleChange}
              >
                <option value="local">local</option>
                <option value="state">state</option>
                <option value="national">national</option>
                {suppliers.map((product, index) => (
                  <option key={index} value={product.productName}>
                    {product.SupplierName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Added On</Form.Label>
              <Form.Control type="text" placeholder="A"  name="supplier" onChange={handleChange}/>
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formProduct">
              <Form.Label className="fw-semibold">Select Product</Form.Label>
              <Form.Select
                name="productStatus"
                //  value={formData.productStatus}
                onChange={handleChange}
              >
                <option value="In-Stock">In-Stock</option>
                <option value="Out-of-Stock">Out-of-Stock</option>
                <option value="Discontinued">Discontinued</option>
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

export default AddProduct;

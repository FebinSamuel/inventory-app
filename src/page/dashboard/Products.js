import React, { useEffect } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Button, Modal } from "react-bootstrap";
import Addproduct from "./products/components/Addproduct";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { Button, Offcanvas } from "react-bootstrap";
import { Form } from "react-bootstrap";

const Products = (props) => {
  const [products, setProducts] = useState([]); // State to hold product data
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState([]);
  const [editProductId, setEditProductId] = useState();
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);

  useEffect(() => {
    setFilteredItems(products);
  }, [products]);

  useEffect(() => {
    editHandler();
  }, [showEditModal]);

  const editHandler = async () => {
    try {
      const productDoc = doc(db, "products", editProductId);
      const docSnap = await getDoc(productDoc);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      } else {
        console.error("Product not found!");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    });
    // Unsubscribe from the snapshot listener when component unmounts
    return () => unsubscribe();
  }, []);

  const handleDelete = (id) => {
    const Doc = doc(db, "products", id);
    return deleteDoc(Doc);
  };
  const handleEdit = (id) => {
    setEditProductId(id);
    setShowEditModal(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleClose = () => setShowEditModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const saleDoc = doc(db, "products", editProductId);

      // Update 'updated_at' timestamp
      const policyWithTimestamp = {
        ...formData,
        updated_at: serverTimestamp(),
      };

      await updateDoc(saleDoc, policyWithTimestamp);

      console.log("Form Data Saved to Firestore:", formData);
      handleClose();
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Assuming policy is your original data array
    if (searchTerm === "") {
      // If the search term is empty, reset to the original policies
      setFilteredItems(products);
    } else {
      const filteredItems = products.filter((user) =>
        user.productName.toLowerCase().includes(searchTerm)
      );
      setFilteredItems(filteredItems);
    }
  };
  console.log("ff", filteredItems);

  return (
    <>
      <div className="bg-white h-screen">
        <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          <div class="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
            <div class="px-6 flex items-center justify-between space-x-4 2xl:container">
              <h5 class="text-2xl text-gray-600 font-medium lg:block">
                {/* Inventory Management System */}
              </h5>
            </div>
          </div>

          <div className={`card mx-4 mb-2 mb-xl-8 mt-2`}>
            <div className="card border-0 m-4 ">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="symbol symbol-45px me-5">
                    {/* <img src={toAbsoluteUrl(`/media/logos/${icon}`)} alt='' /> */}
                  </div>
                  <div className="d-flex flex-column">
                    <span className="card-label fw-bold fs-2">
                      Products
                    </span>
                    {/* <span className='text-muted fw-semibold fs-7'>{desc}</span> */}
                  </div>
                </div>
                <Addproduct />
              </div>
            </div>
          </div>

          <div className="card m-4 h-100">
            <div className="mx-3 mt-3 fs-4 d-flex align-items-center">
              <span>Overall Inventory</span>
              <div className="ms-auto ">
                <input
                  type="text"
                  data-kt-user-table-filter="search"
                  className="form-control form-control-solid w-250px ps-14"
                  placeholder="Search Products"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div class="table-responsive m-4">
              <table class="table table-hover">
                <thead>
                  <tr class="fw-bold fs-6 text-gray-800">
                    <th>Products</th>
                    <th>Buying Price</th>
                    <th>Quantity</th>
                    <th>Selling Price</th>
                    <th>Supplier</th>
                    <th>Added on</th>
                    <th>Availabe</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((product) => (
                    <tr key={product.id}>
                      <td>{product.productName}</td>
                      <td>{product.buyingPrice}</td>
                      <td>{product.quantity}</td>
                      <td>{product.sellingPrice}</td>
                      <td>{product.supplier}</td>
                      <td>{product.addedOn}</td>
                      <td>
                        {product.productStatus === "In-Stock" && (
                          <span className="badge bg-success p-1 text-white">
                            {product.productStatus}
                          </span>
                        )}
                        {product.productStatus === "Out-of-Stock" && (
                          <span className="badge bg-warning p-1 text-white">
                            {product.productStatus}
                          </span>
                        )}
                        {product.productStatus === "Stopped" && (
                          <span className="badge bg-danger p-1 text-white">
                            {product.productStatus}
                          </span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEdit(product.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Offcanvas
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Edit Product</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Product</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Product Name"
                        name="productName"
                        onChange={handleChange}
                        value={formData.productName}
                      />
                      {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Buying Price</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Buying Price"
                        name="buyingPrice"
                        onChange={handleChange}
                        value={formData.buyingPrice}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Quantity"
                        name="quantity"
                        onChange={handleChange}
                        value={formData.quantity}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Selling Price</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Selling Price"
                        name="sellingPrice"
                        onChange={handleChange}
                        value={formData.sellingPrice}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formProduct">
                      <Form.Label>Select Product</Form.Label>
                      <Form.Select
                        name="productStatus"
                        //  value={formData.productStatus}
                        onChange={handleChange}
                        value={formData.productStatus}
                      >
                        <option value="In-Stock">In-Stock</option>
                        <option value="Out-of-Stock">Out-of-Stock</option>
                        <option value="Stopped">Stopped</option>
                        {/* Add more options as needed */}
                      </Form.Select>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Edit Product
                    </Button>
                  </Form>
                </Offcanvas.Body>
              </Offcanvas>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;

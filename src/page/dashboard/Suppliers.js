import React, { useEffect, useState } from "react";
import Addsupplier from "./products/components/Addsupplier";
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
import { Button, Form, Offcanvas } from "react-bootstrap";

const Suppliers = () => {
  const [supplier, setSupplier] = useState([]);
  const [editProductId, setEditProductId] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);

  useEffect(() => {
    setFilteredItems(supplier);
  }, [supplier]);

  useEffect(() => {
    editHandler();
  }, [showEditModal]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Assuming policy is your original data array
    if (searchTerm === "") {
      // If the search term is empty, reset to the original policies
      setFilteredItems(supplier);
    } else {
      const filteredItems = supplier.filter((user) =>
        user.SupplierName.toLowerCase().includes(searchTerm)
      );
      setFilteredItems(filteredItems);
    }
  };

  const editHandler = async () => {
    try {
      const productDoc = doc(db, "supplier", editProductId);
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
    const unsubscribe = onSnapshot(collection(db, "supplier"), (snapshot) => {
      const suppliersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSupplier(suppliersData);
    });
    // Unsubscribe from the snapshot listener when component unmounts
    return () => unsubscribe();
  }, []);

  const handleDelete = (id) => {
    const Doc = doc(db, "supplier", id);
    return deleteDoc(Doc);
  };
  const handleEdit = (id) => {
    // setEditProduct(product);
    // editHandler();
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
      const saleDoc = doc(db, "supplier", editProductId);

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

  return (
    <>
      <div className="bg-white h-screen">
        <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          <div class="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
            <div class="px-6 flex items-center justify-between space-x-4 2xl:container">
              <h5 hidden class="text-2xl text-gray-600 font-medium lg:block">
                Dashboard
              </h5>
              <button class="w-12 h-16 -mr-2 border-r lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 my-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
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
                    <span className="card-label fw-bold fs-2">Supplier</span>
                  </div>
                </div>
                {/* <Addproduct /> */}
                <Addsupplier />
              </div>
            </div>
          </div>

          <div className="card m-4 h-100">
            <div className="mx-3 mt-3 fs-4 d-flex align-items-center">
              <span>Suppliers records</span>
              <div className="ms-auto ">
                <input
                  type="text"
                  data-kt-user-table-filter="search"
                  className="form-control form-control-solid w-250px ps-14"
                  placeholder="Search suppliers"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </div>
              {/* <button className="btn btn-primary mx-4">Add Supplier</button> */}
            </div>

            <div class="table-responsive m-4">
              <table class="table table-hover">
                <thead>
                  <tr class="fw-bold fs-6 text-gray-800">
                    <th>Supplier Name</th>
                    <th>Product</th>
                    <th>Contact Number</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((supplier) => (
                    <tr key={supplier.id}>
                      <td>{supplier.SupplierName}</td>
                      <td>{supplier.product}</td>
                      <td>{supplier.contactNumber}</td>
                      <td>{supplier.address}</td>
                      <td>{supplier.email}</td>
                      <td>{supplier.productType}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEdit(supplier.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(supplier.id)}
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
                      <Form.Label>Supplier Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Supplier name"
                        name="SupplierName"
                        onChange={handleChange}
                        value={formData.SupplierName}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Product</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter product"
                        name="product"
                        onChange={handleChange}
                        value={formData.product}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Contact number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter  Contact number"
                        name="contactNumber"
                        onChange={handleChange}
                        value={formData.contactNumber}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter address"
                        name="address"
                        onChange={handleChange}
                        value={formData.address}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formProduct">
                      <Form.Label>Type</Form.Label>
                      <Form.Select
                        name="productType"
                        //  value={formData.productStatus}
                        onChange={handleChange}
                        value={formData.productType}
                      >
                        <option value="" disabled selected>
                          Select a Type
                        </option>
                        <option value="Taking Return">Taking Return</option>
                        <option value="Not Taking Return">
                          Not Taking Return
                        </option>
                      </Form.Select>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Edit
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

export default Suppliers;

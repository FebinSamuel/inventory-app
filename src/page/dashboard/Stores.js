import React, { useEffect, useState } from "react";
import AddStore from "./products/components/AddStore";
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

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState([]);
  const [editProductId, setEditProductId] = useState();

  useEffect(() => {
    editHandler();
  }, [showEditModal]);

  const editHandler = async () => {
    try {
      const productDoc = doc(db, "stores", editProductId);
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
    const unsubscribe = onSnapshot(collection(db, "stores"), (snapshot) => {
      const suppliersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStores(suppliersData);
    });
    // Unsubscribe from the snapshot listener when component unmounts
    return () => unsubscribe();
  }, []);

  const handleDelete = (id) => {
    const Doc = doc(db, "stores", id);
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
      const saleDoc = doc(db, "stores", editProductId);

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

          <div className="card m-4 h-100">
            <div className="mx-3 mt-3 fs-4 d-flex align-items-center">
              <span className="fs-2 fw-bold my-4">Manage Store</span>
              <div className="ms-auto mx-2">
                {/* <input
                  type="text"
                  data-kt-user-table-filter="search"
                  className="form-control form-control-solid w-250px ps-14"
                  placeholder="Search stores"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                /> */}
              </div>
              {/* <button className="btn btn-primary mx-4">Add Store</button> */}
              <AddStore />
            </div>
            {stores.map((store) => (
              <>
                <div className="card my-4 ml-5 mr-20 rounded">
                  <div className="row">
                    {/* One-third for name with custom background */}
                    <div className="col-4 bg-light fw-bold rounded ml-3">
                      <div className="text-center fs-4 my-5">
                        {store.storeName}
                      </div>
                    </div>
                    {/* Two-thirds for store information */}
                    <div className="col-6 my-4">
                      <div>
                        {/* Store information: name, address, phone number */}
                        <div>{store.storeName}</div>
                        <div>{store.location}</div>
                        <div>{store.phoneNumber}</div>
                      </div>
                    </div>
                    {/* Edit button */}
                    <div className="col-1 d-flex align-items-center justify-content-end">
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleEdit(store.id)}
                        style={{ width: "100px" }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          <Offcanvas
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Edit Store</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Store Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Store Name"
                    name="storeName"
                    onChange={handleChange}
                    value={formData.storeName}
                  />
                  {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Location"
                    name="location"
                    onChange={handleChange}
                    value={formData.location}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone number"
                    name="phoneNumber"
                    onChange={handleChange}
                    value={formData.phoneNumber}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Branch no.</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter branch number"
                    name="branchNumber"
                    onChange={handleChange}
                    value={formData.branchNumber}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Edit Store
                </Button>
              </Form>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </div>
    </>
  );
};

export default Stores;

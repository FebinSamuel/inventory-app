import React, { useEffect, useState } from "react";
import AddOrder from "./products/components/AddOrder";
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

const Orders = () => {
  const [order, setOrder] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState([]);
  const [editProductId, setEditProductId] = useState();
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);

  useEffect(() => {
    setFilteredItems(order);
  }, [order]);

  useEffect(() => {
    editHandler();
  }, [showEditModal]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Assuming policy is your original data array
    if (searchTerm === "") {
      // If the search term is empty, reset to the original policies
      setFilteredItems(order);
    } else {
      const filteredItems = order.filter((user) =>
        user.productName.toLowerCase().includes(searchTerm)
      );
      setFilteredItems(filteredItems);
    }
  };

  const editHandler = async () => {
    try {
      const productDoc = doc(db, "orders", editProductId);
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
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrder(ordersData);
    });
    // Unsubscribe from the snapshot listener when component unmounts
    return () => unsubscribe();
  }, []);
  console.log(order);
  const handleDelete = (id) => {
    const Doc = doc(db, "orders", id);
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
      const saleDoc = doc(db, "orders", editProductId);

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
                    <span className="card-label fw-bold fs-2">
                      Overall Orders
                    </span>
                  </div>
                </div>
                <AddOrder />
              </div>
            </div>
          </div>

          <div className="card m-4 h-100">
            <div className="mx-3 mt-3 fs-4 d-flex align-items-center">
              <span>Orders record</span>

              <div className="ms-auto ">
                <input
                  type="text"
                  data-kt-user-table-filter="search"
                  className="form-control form-control-solid w-250px ps-14"
                  placeholder="Search orders"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn btn-primary mx-4">Download</button>
            </div>

            <div class="table-responsive m-4">
              <table class="table table-hover">
                <thead>
                  <tr class="fw-bold fs-6 text-gray-800">
                    <th>Order ID</th>
                    <th>Products</th>
                    <th>Product Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Placed on</th>
                    <th>Expected Delivery</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.orderId}</td>
                      <td>{item.productName}</td>
                      <td>{item.productPrice}</td>
                      <td>{item.quantity}</td>
                      <td>{item.total}</td>
                      <td>{item.orderPlacedDate}</td>
                      <td>{item.expectedDeliveryDate}</td>
                      <td>{item.productStatus}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEdit(item.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(item.id)}
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
                  <Offcanvas.Title>Edit Order</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Order ID</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Order Id"
                        name="orderId"
                        onChange={handleChange}
                        value={formData.orderId}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Product</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Product Name"
                        name="productName"
                        onChange={handleChange}
                        value={formData.productName}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Order Value</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Product Price"
                        name="productPrice"
                        onChange={handleChange}
                        value={formData.productPrice}
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
                      <Form.Label>Total</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Total"
                        name="total"
                        onChange={handleChange}
                        value={formData.total}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Placed On</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder=""
                        name="orderPlacedDate"
                        onChange={handleChange}
                        value={formData.orderPlacedDate}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Expected Delivery</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder=""
                        name="expectedDeliveryDate"
                        onChange={handleChange}
                        value={formData.expectedDeliveryDate}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formProduct">
                      <Form.Label>Select status</Form.Label>
                      <Form.Select
                        name="productStatus"
                        //  value={formData.productStatus}
                        onChange={handleChange}
                        value={formData.productStatus}
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
                      Edit order
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

export default Orders;

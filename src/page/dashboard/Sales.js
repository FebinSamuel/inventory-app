import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import AddSales from "./products/components/AddSales";
import "bootstrap/dist/css/bootstrap.min.css";
import Invoice from "./products/print/Invoice";
import EditSales from "./products/components/EditSales";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    setFilteredSales(sales);
  }, [sales]);

  console.log(sales);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "sales"), (snapshot) => {
      const suppliersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSales(suppliersData);
    });
    // Unsubscribe from the snapshot listener when component unmounts
    return () => unsubscribe();
  }, []);

  const handleDelete = (id) => {
    const Doc = doc(db, "sales", id);
    return deleteDoc(Doc);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Assuming policy is your original data array
    if (searchTerm === "") {
      // If the search term is empty, reset to the original policies
      setFilteredSales(sales);
    } else {
      const filteredItems = sales.filter((user) =>
        user.customerName.toLowerCase().includes(searchTerm)
      );
      setFilteredSales(filteredItems);
    }
  };
  console.log("ff", filteredSales);

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
                    <span className="card-label fw-bold fs-2">Sales</span>
                  </div>
                </div>
                <AddSales />
              </div>
            </div>
          </div>

          <div className="card m-4 h-100">
            <div className="mx-3 mt-3 fs-4 d-flex align-items-center">
              <span className="">Sales record</span>
              <div className="ms-auto ">
                <input
                  type="text"
                  data-kt-user-table-filter="search"
                  className="form-control form-control-solid w-250px ps-14"
                  placeholder="Search sales info"
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
                    <th>Order ID</th>
                    <th>Sales Date</th>
                    <th>Customer Name</th>
                    <th>Phone Number</th>
                    <th>Item Name</th>
                    <th>Item Price</th>
                    <th>Item Quantity</th>
                    <th>Sales Channel</th>
                    <th>Payment</th>
                    <th>Payment Method</th>
                    <th>Sales Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSales.map((sale) => (
                    <tr key={sale.id}>
                      <td>{sale.orderId}</td>
                      <td>{sale.salesDate}</td>
                      <td>{sale.customerName}</td>
                      <td>{sale.phoneNumber}</td>
                      <td>{sale.itemsName}</td>
                      <td>{sale.itemCost}</td>
                      <td>{sale.itemSold}</td>
                      <td>{sale.salesChannel}</td>
                      <td>{sale.payment}</td>
                      <td>{sale.paymentMethod}</td>
                      <td>{sale.salesTotal}</td>
                      <td>
                     
                        <div className="d-flex align-items-center">
                        <Invoice id={sale.id}/>
                        {/* <button className="btn btn-sm btn-primary" onClick={openModal}>Bill</button> */}
                          <EditSales id={sale.id} />
                          <button
                            className="btn btn-sm btn-danger mx-1"
                            onClick={() => handleDelete(sale.id)}
                          >
                            Delete
                          </button>
                          {/* Additional buttons can be added here */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* {showModal && <Invoice closeModal={() => setShowModal(false)} />} */}
          
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sales;

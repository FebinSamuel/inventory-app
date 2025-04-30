import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";
const DashCard = () => {
  const [sales, setSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const [supplier, setSupplier] = useState(0);

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
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const suppliersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrderNumber(suppliersData.length);

    });
    // Unsubscribe from the snapshot listener when component unmounts
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTotalProducts(productsData.length);
    });
    // Unsubscribe from the snapshot listener when component unmounts
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const total = sales.reduce(
      (total, sale) => total + parseInt(sale.salesTotal),
      0
    );
    setTotalSales(total);
  }, [sales]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "supplier"), (snapshot) => {
      console.log("Supplier snapshot exists?", !snapshot.empty);
      console.log("Supplier docs:", snapshot.docs);
      console.log("Supplier data:", snapshot.docs.map(doc => doc.data()));
      const suppliersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSupplier(suppliersData.length);
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <div className="m-4 mt-2 fs-1 text-center fw-bold">
        Inventory Management System
      </div>
      <div className="container-fluid mb-5">
        <div className="row g-3 my-2">
          <div className="col-md-3 " >
            <div className="p-3 border shadow-sm d-flex justify-content-around align-items-center rounded" style={{background:"#54DAF6"}} >
              <div>
                <h3 className="fs-2">{totalProducts}</h3>
                <p className="fs-4 fw-semibold">Products</p>
              </div>
              <img
                src="/icons/cart4.svg"
                alt=""
                className="me-2 my-4"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-3 border shadow-sm d-flex justify-content-around align-items-center rounded" style={{background:"lavender"}}>
              <div>
                <h3 className="fs-3"> Rs {totalSales}</h3>
                <p className="fs-4 fw-semibold">Sales</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                fill="currentColor"
                className="bi bi-currency-rupee me-2 my-4"
                viewBox="0 0 16 16"
              >
                <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
              </svg>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 border shadow-sm d-flex justify-content-around align-items-center rounded" style={{background:"pink"}}>
              <div>
                <h3 className="fs-2">{orderNumber}</h3>
                <p className="fs-4 fw-semibold">No. of orders</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                fill="currentColor"
                class="bi bi-truck me-2 my-4"
                viewBox="0 0 16 16"
              >
                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
              </svg>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 border shadow-sm d-flex justify-content-around align-items-center rounded" style={{background:"lightgreen"}}>
              <div>
                <h3 className="fs-2">{supplier}</h3>
                <p className="fs-4 fw-semibold">No. of Supplier</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                fill="currentColor"
                class="bi bi-graph-up-arrow me-2 my-4"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashCard;


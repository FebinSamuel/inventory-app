import React, { useEffect, useState } from "react";
import DashCard from "./components/DashCard";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom/dist";

const Dashboard = (props) => {
  const [sales, setSales] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = location.state && location.state.isLoggedIn;
    if (isLoggedIn) {
      toast.success("Login successful!");
    }
  }, [location.state]);
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

  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

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

          <div class="px-6 pt-6 2xl:container">
            <DashCard />
          </div>
          <div className="mx-4 ">
            <div className="fs-3 fw-bold m-1 mb-2">Todays Sales</div>
            <div class="table-responsive ">
              <table class="table table-rounded table-striped border gy-7 gs-7 table-hover">
                <thead>
                  <tr class="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200">
                    <th>Order ID</th>
                    <th>Sales Date</th>
                    <th>Customer Name</th>
                    <th>Items Name</th>
                    <th>Item Sold</th>
                    <th>Sales Channel</th>
                    <th>Payment Method</th>
                    <th>Sales Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sales
                    .filter((sale) => sale.salesDate === formattedToday)
                    .map((sale) => (
                      <tr key={sale.id}>
                        <td>{sale.orderId}</td>
                        <td>{sale.salesDate}</td>
                        <td>{sale.customerName}</td>
                        <td>{sale.itemsName}</td>
                        <td>{sale.itemSold}</td>
                        <td>{sale.salesChannel}</td>
                        <td>{sale.paymentMethod}</td>
                        <td>{sale.salesTotal}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-center" autoClose={5000} />
    </>
  );
};

export default Dashboard;

import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { db } from "../services/firebase";
import PieChart from "./Charts/PieChart";
import BarChart from "./Charts/BarChart";
import OrderBarChart from "./Charts/OrderBarChart";

const Report = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("Yearly");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [sales, setSales] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [orders, setOrder] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleYearChange = (event) =>
    setSelectedYear(parseInt(event.target.value));

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

  const transformSalesData = (sales) => {
    const salesByMonth = Array(12).fill(0);
    sales.forEach((sale) => {
      const date = new Date(sale.salesDate);
      if (date.getFullYear() === selectedYear) {
        const month = date.getMonth();
        salesByMonth[month] += parseFloat(sale.salesTotal);
      }
    });

    return salesByMonth.map((total, index) => ({
      month: new Date(selectedYear, index).toLocaleString("default", {
        month: "long",
      }),
      sales: total,
    }));
  };

  useEffect(() => {
    if (sales.length > 0) {
      const transformedData = transformSalesData(sales);
      setSalesData(transformedData);
    }
  }, [sales, selectedYear]);

  useEffect(() => {
    getProducts();
  }, [showEditModal, selectedPeriod]);

  useEffect(() => {
    let filtered;
    const currentDate = new Date();

    switch (selectedPeriod) {
      case "Yearly":
        filtered = formData.filter((product) => {
          const productDate = new Date(product.addedOn);
          return productDate.getFullYear() === currentDate.getFullYear();
        });
        break;
      case "Monthly":
        filtered = formData.filter((product) => {
          const productDate = new Date(product.addedOn);
          return (
            productDate.getFullYear() === currentDate.getFullYear() &&
            productDate.getMonth() === currentDate.getMonth()
          );
        });
        break;
      case "Weekly":
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(currentDate.getDate() - 7);
        filtered = formData.filter((product) => {
          const productDate = new Date(product.addedOn);
          return productDate >= oneWeekAgo;
        });
        break;
      default:
        filtered = formData;
    }

    setFilteredData(filtered);
  }, [selectedPeriod, formData]);

  const getProducts = async () => {
    try {
      const productsCollection = collection(db, "products");
      const querySnapshot = await getDocs(productsCollection);

      const productsData = [];
      querySnapshot.forEach((doc) => {
        // Retrieve data from each document and push it into the productsData array
        productsData.push({ id: doc.id, ...doc.data() });
      });

      setFormData(productsData);
      return productsData;
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProducts();

      // Transform the data to the format required by the PieChart
      const transformedData = productsData.map((product) => ({
        id: product.productName,
        label: product.productName,
        value: parseInt(product.quantity, 10), // Assuming you want to use quantity as the value
        color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`, // Generate a random color
      }));

      setData(transformedData);
    };

    fetchData();
  }, []);

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

  // Transform order data into the format required by the chart
  const transformOrderData = (orders) => {
    const ordersByMonth = Array(12).fill(0);
    orders.forEach((order) => {
      const date = new Date(order.orderPlacedDate);
      if (date.getFullYear() === selectedYear) {
        const month = date.getMonth();
        ordersByMonth[month]++;
      }
    });

    return ordersByMonth.map((count, index) => ({
      month: new Date(selectedYear, index).toLocaleString("default", {
        month: "long",
      }),
      orders: count,
    }));
  };

  useEffect(() => {
    if (orders.length > 0) {
      const transformedData = transformOrderData(orders);
      setOrdersData(transformedData);
    }
  }, [orders, selectedYear]);

  return (
    <>
      <div className="d-flex flex-column vh-100 bg-white">
        <div className="flex-grow-1 overflow-auto">
          <div className="bg-white h-screen">
            <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
              <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
                <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
                  <h5 className="text-2xl text-gray-600 font-medium lg:block text-center">
                    {/* Inventory Management system */}
                  </h5>
                </div>
              </div>

              <div style={{ height: "500px" }} className="mb-4">
                <h2 className="text-center mt-4">Total Inventory Record</h2>
                <PieChart data={data} />
              </div>
              <hr />
              <div className="m-5">
                <label htmlFor="year-select " className="form-label  fs-4">
                  Select Year:
                </label>

                <select
                  id="year-select"
                  value={selectedYear}
                  className="bg-white  fs-4 form-control"
                  onChange={handleYearChange}
                >
                  {Array.from(
                    { length: 5 },
                    (_, i) => new Date().getFullYear() - i
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <p className="fs-8 text-muted">
                  (Select a year to see the sales record and orders record.)
                </p>
              </div>
              <div
                style={{ height: "500px", width: "90%", marginLeft: "20px" }}
                className="my-5 mx-5"
              >
                <h2 className="text-center mt-12 flex items-center justify-center">
                  Total Sales Record [{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-currency-rupee-nepalese mt-1"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 5h-11h3a4 4 0 1 1 0 8h-3l6 6" />
                    <path d="M21 17l-4.586 -4.414a2 2 0 0 0 -2.828 2.828l.707 .707" />
                  </svg>
                  ]
                </h2>

                <BarChart data={salesData} />
              </div>
              <div
                style={{ height: "500px", width: "90%", marginLeft: "20px" }}
                className="my-5 mx-5"
              >
                <h2 className="text-center mt-12 flex items-center justify-center">
                  Total Orders Record [{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0a0a0a"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart mt-1"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 17h-11v-14h-2" />
                    <path d="M6 5l14 1l-1 7h-13" />
                  </svg>
                  ]
                </h2>
                <OrderBarChart data={ordersData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;

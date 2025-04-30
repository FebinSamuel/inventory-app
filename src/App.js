import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./page/services/firebase";
// import Home from "./page/Home";
// import About from "./page/About";
// import Contact from "./page/Contact";
import Dashboard from "./page/dashboard/Dashboard";

import HeaderAndSidebar from "./component/HeaderAndSidebar";
import Login from "./page/auth/Login";
import Signup from "./page/auth/Signup";
import Products from "./page/dashboard/Products";
import Sales from "./page/dashboard/Sales";
import Orders from "./page/dashboard/Orders";
import Stores from "./page/dashboard/Stores";
import Report from "./page/dashboard/Report";
import Suppliers from "./page/dashboard/Suppliers";
//import Invoice from "./page/dashboard/products/print/Invoice";
import CreateAccount from "./page/dashboard/products/components/CreateAccount";
import EditSales from "./page/dashboard/products/components/EditSales";
//import PrivateRoute from "./page/PrivateRoute";

//<script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-beta1/js/bootstrap.bundle.min.js"></script>;
//const ProtectedRoute = ({ children, ...rest }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setIsLoggedIn(!!user);
  //   });

  //   // Cleanup subscription on unmount
  //   return () => unsubscribe();
  // }, []);

  // return isLoggedIn ? children : <Navigate to="/login" />;
//};

const PrivateRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null;

  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  //const isLoggedInCookie = document.cookie.includes("isLoggedIn");
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Login />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
    

        <Route path="/dashboard" element={  <PrivateRoute><HeaderAndSidebar /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="sales" element={<Sales />} />
          <Route path="products" element={<Products />} />
          <Route path="report" element={<Report />} />
          <Route path="supplier" element={<Suppliers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="stores" element={<Stores />} />
          <Route path="createAccount" element={<CreateAccount />} />
     
        </Route>
       

        <Route path="/editSales" element={<EditSales />} />
        <Route
          path="*"
          element={
            <div>
              <h1 className="text-center text-5xl font-bold">404 Not Found</h1>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

import React, { useEffect, useMemo } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, db } from "../page/services/firebase";
import { collection, getDocs } from "firebase/firestore";

const getDashboardMenu22 = (matchedUser) => {
  // const matchedUser = users.filter((user) => user.user === "1");

  if (matchedUser && matchedUser.user === "1") {
    return [
      {
        id: 1,
        name: "Dashboard",
        link: "/dashboard",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
            <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
            <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
            <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
          </svg>
        ),
      },
      {
        id: 2,
        name: "Sales",
        link: "/dashboard/sales",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-currency-rupee-nepalese"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 5h-11h3a4 4 0 1 1 0 8h-3l6 6" />
            <path d="M21 17l-4.586 -4.414a2 2 0 0 0 -2.828 2.828l.707 .707" />
          </svg>
        ),
      },
      {
        id: 3,
        name: "Products",
        link: "/dashboard/products",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-building-warehouse"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 21v-13l9 -4l9 4v13" />
            <path d="M13 13h4v8h-10v-6h6" />
            <path d="M13 21v-9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v3" />
          </svg>
        ),
      },
      {
        id: 6,
        name: "Orders",
        link: "/dashboard/orders",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-folders"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
            <path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2" />
          </svg>
        ),
      },
      {
        id: 4,
        name: "Report",
        link: "/dashboard/report",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icon-tabler-report"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697" />
            <path d="M18 14v4h4" />
            <path d="M18 11v-4a2 2 0 0 0 -2 -2h-2" />
            <path d="M8 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
            <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M8 11h4" />
            <path d="M8 15h3" />
          </svg>
        ),
      },
      {
        id: 5,
        name: "Supplier",
        link: "/dashboard/supplier",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icon-tabler-users"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
          </svg>
        ),
      },
      {
        id: 7,
        name: "Manage Store",
        link: "/dashboard/stores",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-building-store"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 21l18 0" />
            <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
            <path d="M5 21l0 -10.15" />
            <path d="M19 21l0 -10.15" />
            <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
          </svg>
        ),
      },
      {
        id: 8,
        name: "Create Account",
        link: "/dashboard/createAccount",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-user-plus"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M16 19h6" />
            <path d="M19 16v6" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
          </svg>
        ),
      },
      // ... (other menu items)
    ];
  }else{
    return[
      {
        id: 1,
        name: "Dashboard",
        link: "/dashboard",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
            <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
            <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
            <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
          </svg>
        ),
      },
      {
        id: 2,
        name: "Sales",
        link: "/dashboard/sales",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-currency-rupee-nepalese"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 5h-11h3a4 4 0 1 1 0 8h-3l6 6" />
            <path d="M21 17l-4.586 -4.414a2 2 0 0 0 -2.828 2.828l.707 .707" />
          </svg>
        ),
      },
      {
        id: 3,
        name: "Products",
        link: "/dashboard/products",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-building-warehouse"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 21v-13l9 -4l9 4v13" />
            <path d="M13 13h4v8h-10v-6h6" />
            <path d="M13 21v-9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v3" />
          </svg>
        ),
      },
      {
        id: 6,
        name: "Orders",
        link: "/dashboard/orders",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-folders"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
            <path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2" />
          </svg>
        ),
      },
    ]
  }

  return [];
};
function HeaderAndSidebar(props) {
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [matchedUser, setMatchedUser] = useState(null);
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const [dashboardMenu22, setDashboardMenu2] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const suppliersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (auth.currentUser) {
          const currentUserId = auth.currentUser.uid;
          setCurrentId(currentUserId);
          setUsers(suppliersData.filter((data) => data.id === currentUserId));
          const matchedUser = suppliersData
            .filter((data) => data.id === currentUserId)
            .find((user) => user["user"] === "1");
          setMatchedUser(matchedUser);
          setDataFetched(true);
        } // Set the matched user object
   
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);


  const memoizedGetDashboardMenu22 = useMemo(
    () => getDashboardMenu22(matchedUser),
    [matchedUser]
  );
  const removeCookie = (name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  console.log(users);
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        navigate("/login");
        localStorage.removeItem("valid");
        removeCookie("isLoggedIn");
        console.log("User signed out");
      })
      .catch((error) => {
        // An error happened.
        setError(error.message);
      });
  };


  // const dashboardMenu = [
  //   {
  //     id: 1,
  //     name: "Dashboard",
  //     link: "/dashboard",
  //     icon: (
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         width="24"
  //         height="24"
  //         viewBox="0 0 24 24"
  //         fill="none"
  //         stroke="currentColor"
  //         stroke-width="2"
  //         stroke-linecap="round"
  //         stroke-linejoin="round"
  //         class="icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard"
  //       >
  //         <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  //         <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
  //         <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
  //         <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
  //         <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
  //       </svg>
  //     ),
  //   },
  //   {
  //     id: 2,
  //     name: "Sales",
  //     link: "/dashboard/sales",
  //     icon: (
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         width="24"
  //         height="24"
  //         viewBox="0 0 24 24"
  //         fill="none"
  //         stroke="currentColor"
  //         stroke-width="2"
  //         stroke-linecap="round"
  //         stroke-linejoin="round"
  //         class="icon icon-tabler icons-tabler-outline icon-tabler-currency-rupee-nepalese"
  //       >
  //         <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  //         <path d="M15 5h-11h3a4 4 0 1 1 0 8h-3l6 6" />
  //         <path d="M21 17l-4.586 -4.414a2 2 0 0 0 -2.828 2.828l.707 .707" />
  //       </svg>
  //     ),
  //   },
  //   {
  //     id: 3,
  //     name: "Products",
  //     link: "/dashboard/products",
  //     icon: (
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         width="24"
  //         height="24"
  //         viewBox="0 0 24 24"
  //         fill="none"
  //         stroke="currentColor"
  //         stroke-width="2"
  //         stroke-linecap="round"
  //         stroke-linejoin="round"
  //         class="icon icon-tabler icons-tabler-outline icon-tabler-building-warehouse"
  //       >
  //         <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  //         <path d="M3 21v-13l9 -4l9 4v13" />
  //         <path d="M13 13h4v8h-10v-6h6" />
  //         <path d="M13 21v-9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v3" />
  //       </svg>
  //     ),
  //   },
  //   {
  //     id: 6,
  //     name: "Orders",
  //     link: "/dashboard/orders",
  //     icon: (
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         width="24"
  //         height="24"
  //         viewBox="0 0 24 24"
  //         fill="none"
  //         stroke="currentColor"
  //         stroke-width="2"
  //         stroke-linecap="round"
  //         stroke-linejoin="round"
  //         class="icon icon-tabler icons-tabler-outline icon-tabler-folders"
  //       >
  //         <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  //         <path d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
  //         <path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2" />
  //       </svg>
  //     ),
  //   },
  // ];

  console.log(dashboardMenu22);
  return (
    <div>
      <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      {/* {dataFetched &&  */}
        <div>
          <div className="-mx-6 px-6 py-">
            <Link to="/dashboard" title="home" className="text-decoration-none">
              {/* Add the text-decoration-none class to the Link component */}
              {/* <h5 className="fw-bold text-decoration-none text-center">Shakya Handicraft</h5> */}
              <img
                src="/logo/file.png"
                alt=""
                loading="lazy"
                style={{ height: "65px", width: "300px" }}
              />
            </Link>
          </div>

          {/* <div className="mt-8 text-center">
          <img
              src="/images/blank.png"
              alt=""
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
              Aayushma Shakya
            </h5>
            <span className="hidden text-gray-400 lg:block">Admin</span>
          </div> */}

          <ul className="space-y-2 tracking-wide mt-8">
            {/* {dashboardMenu.map((m) => (
              <Link to={m.link} className="nav-link text-decoration-none">
                <li
                  key={m.id}
                  className={
                    window.location.pathname === m.link
                      ? "bg-gradient-to-r from-sky-500 to-cyan-300 active:text-white rounded-xl group"
                      : ""
                  }
                >
                  <div
                    className="px-4 py-3 flex items-center space-x-4 text-black hover:rounded-xl group"
                    onClick={() => {
                      window.location.pathname = m.link;
                    }}
                  >
                    {m.icon}
                    <span className="-mr-1 font-medium">{m.name}</span>
                  </div>
                </li>
              </Link>
            ))} */}

            {memoizedGetDashboardMenu22.length > 0 &&
              memoizedGetDashboardMenu22.map((m) => (
                <li
                  key={m.id}
                  className={`px-4 py-3 flex items-center space-x-4 text-black hover:rounded-xl group ${
                    window.location.pathname === m.link
                      ? "bg-gradient-to-r from-sky-500 to-cyan-300 active:text-white rounded-xl"
                      : ""
                  }`}
                >
                  <Link
                    to={m.link}
                    className="nav-link text-decoration-none flex-grow"
                  >
                    <div className="flex items-center">
                      {m.icon}
                      <span className="-mr-1 mx-3 font-medium">{m.name}</span>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
{/* } */}
        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button className="w-full px-4 py-3 mx-4 flex items-center space-x-4 rounded-md text-gray-600 hover:bg-gradient-to-r from-sky-500 to-cyan-300 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e81111"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-logout"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
              <path d="M9 12h12l-3 -3" />
              <path d="M18 15l3 -3" />
            </svg>
            <button
              onClick={handleSignOut}
              className="btn fw-bold fs-5 text-danger p-0 mx-0"
            >
              Sign Out
            </button>
          </button>
        </div>
      </aside>
      <Outlet />
    </div>
  );
}

export default HeaderAndSidebar;






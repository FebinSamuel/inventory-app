import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const isLoggedIn = getCookie("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const onLogin = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Signed in as", user);
        console.log("Attempting to navigate to dashboard");
        localStorage.setItem("valid", true);
        setCookie("isLoggedIn", true, 1);
        navigate("/dashboard");
        navigate("/dashboard", { state: { isLoggedIn: true } });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/invalid-credential") {
          setError("Please enter valid email and password");
        } else {
          setError(errorMessage);
        }

        // setError(errorMessage);
        console.log(errorCode, errorMessage);
      });
  };

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };

  const getCookie = (name) => {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  };

  const removeCookie = (name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <>

      <main>
        <section className="bg-light">
          <div className="container-fluid">
            <div className="row g-0">
              <div className="col-12 col-xxl-12">
                <div className="row g-0 min-vh-100">
                  <div className="col-12 col-md-6">
                    <img
                      className="img-fluid rounded-start w-100 h-100 object-fit-cover"
                      loading="lazy"
                      src="./background/4334841.jpg"
                      alt=""
                    />
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <div className="col-12 col-lg-11 col-xl-10">
                      <div className="card-body p-3 p-md-4 p-xl-5">
                        <div className="row">
                          <div className="col-12">
                            <div className="mb-8">
                              <div className="text-center mb-6">
                                {/* <img
                                      src="./assets/img/bsb-logo.svg"
                                      alt="BootstrapBrain Logo"
                                      width="175"
                                      height="57"
                                    /> */}
                                <h1 className="fw-bold text-muted">
                                  Inventory Management System
                                </h1>
                              </div>
                              <h2 className="h4 text-center">Login</h2>
                            </div>
                          </div>
                        </div>
                        <form>
                          {error && (
                            <div className="alert alert-danger">{error}</div>
                          )}
                          <div className="row gy-3 overflow-hidden">
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  id="email"
                                  placeholder="name@example.com"
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                />
                                <label for="email" className="form-label">
                                  Email
                                </label>
                              </div>
                            </div>

                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  type="password"
                                  className="form-control"
                                  name="password"
                                  id="password"
                                  // value=""
                                  placeholder="Password"
                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                                />
                                <label for="password" className="form-label">
                                  Password
                                </label>
                              </div>
                            </div>
                         
                            <div className="col-12">
                              <div className="d-grid">
                                <button
                                  className="btn btn-dark btn-lg"
                                  type="submit"
                                  onClick={onLogin}
                                >
                                  Sign in
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ToastContainer position="bottom-center" autoClose={5000} />
    </>
  );
};

export default Login;

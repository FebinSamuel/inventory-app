import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../page/services/firebase';
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function HomeLogin(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const onLogin = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log('Signed in as', user);
          console.log('Attempting to navigate to dashboard');
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
          console.log(errorCode, errorMessage);
        });
    };
    return (
        <div>
            <div class="hero min-h-screen bg-base-200">
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <div class="text-center lg:text-left">
                    <h1 class="text-5xl font-bold">Login now!</h1>
                    <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div class="card-body">
                        <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input type="text" placeholder="email" class="input input-bordered" />
                        </div>
                        <div class="form-control">
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input type="text" placeholder="password" class="input input-bordered" />
                        <label class="label">
                            <Link to="" class="label-text-alt link link-hover">Forgot password?</Link>
                        </label>
                        </div>
                        <Link to="/dashboard">
                            <div class="form-control mt-6">
                                <button class="btn btn-primary">Login</button>
                            </div>
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeLogin;
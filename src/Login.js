import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    //firebase login method
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();

    //firebase register method
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        //if user authenticated
        if (auth) {
          //redirect
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login-logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG7.png"
        />
      </Link>

      <div className="login-container">
        <h1>Sign in</h1>
        <form action="">
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            onClick={signIn}
            className="login-signin-button"
          >
            Sign In
          </button>
        </form>
        <p>
          By signing in you agree to AMAZON CLONE's Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads{" "}
        </p>
        <button onClick={register} className="login-register-button">
          Create your Amazon account
        </button>
      </div>
    </div>
  );
}

export default Login;

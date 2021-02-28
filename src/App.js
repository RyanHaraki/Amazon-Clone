import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

function App() {
  const [{}, dispatch] = useStateValue();

  const promise = loadStripe(
    "pk_test_51HPvrBJuXssMFPtHvg9wwobIYouln34gday9wiQJjOswPvFROkXjVOh4gVDgG679CKOnzR4kNozd8smRoCt8dw9G00lKF2YWn5"
  );


  useEffect(() => {
    //will only run once when the app component loads
    //listener for login and registers
    auth.onAuthStateChanged((authUser) => {
      console.log("USER >>", authUser);

      if (authUser) {
        //the user just/was logged in. This is sessions with Firebase.
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    //if something in array changes, it fires off the code
  }, []);

  return (
    //BEM
    //default root must be at bottom, this here is react router
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

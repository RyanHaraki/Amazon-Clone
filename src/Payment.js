import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import Axios from "./axios";
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  //this only runs when basket has changed
  useEffect(() => {
    //generate the stripe secret key (lets us charge customer)
    const getClientSecret = async () => {
      const response = await Axios({
        method: "post",
        //Stripe expect total in currencies subunits ($ => c)
        url: `/payments/create?total=${parseInt(getBasketTotal(basket) * 100)}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("secret: ", clientSecret);

  const handleSubmit = async (event) => {
    //Stripe stuff
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation

        db.collection("users") //db collection of users
          .doc(user?.uid) //that users
          .collection("orders") //that users orders
          .doc(paymentIntent.id) //create a doc with payment id
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created, //timestamp
          }); //add this info

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        //swap to orders page
        history.replace("/orders");

        dispatch({
          type: "EMPTY_BASKET",
        });
      });
  };

  const handleChange = (event) => {
    //listen for changes in card element and control errors
    //in this case event is a keypress
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment-container">
        <h1>
          Checkout (<Link to="/checkout">{basket.length} items</Link>)
        </h1>
        {/* payment sectiomn -delivery address */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery address</h3>
          </div>
          <div className="payment-address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* payment sectiomn -review items */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment-item">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* payment sectiomn -payment method */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment-details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment-price-container">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        <h3>Order total: {value}</h3>
                      </p>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeperator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

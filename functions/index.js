//ALL BACKEND NPM INSTALLS HAVE TO BE IN THE FUNCTIONS FOLDER
//the functions folder/file here is a full backend

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HPvrBJuXssMFPtHp8kIlLynABY5kkWIn2xl2ab2cDgnYLkU7HKx4Ej3pLV6eDcxVobf9HwcfWQNCksH1bAM0jzP003ufwhrSG"
);

//API

//App config
const app = express();

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("Payment request received", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //subunits of currency
    currency: "usd",
  });

  //201 - created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//Listen Command with Firebase
exports.api = functions.https.onRequest(app);

//firebase emulators:start to host on firebase

//example endpoint. for other route add a /whatever at the end of api
//http://localhost:5001/project-8784245491664764124/us-central1/api

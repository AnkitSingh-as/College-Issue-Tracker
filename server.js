require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const session = require("express-session");
const passport = require("passport");
//passport-local installed, do not have to set
const passportLocalMongoose = require("passport-local-mongoose");
const { redirect } = require("express/lib/response");

const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
let userDetails = {};

// using config vars to handle multiple environments for now
let URL = process.env.URL;

if (process.env.NODE_ENV !== "production") {
  console.log("not prod");
  URL = "http://localhost:5000";
}

//config session for express
app.use(
  session({
    secret: process.env.EXPRESS_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// need this to parse the json with the req
app.use(express.json());
app.use(express.text());

//connect to Mongo
mongoose
  .connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Now connected to MongoDB!"))
  .catch((err) => console.error("Something went wrong", err));



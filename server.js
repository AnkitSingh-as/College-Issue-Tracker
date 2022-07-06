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


const issueSchema  = new mongoose.Schema({
    key : Number,
    id : Number,
    title : String,
    description : String,
    author : Number,
    creationDate : Date,
    solvedDate : Date,
    status : String,
    likes: Array,
    imgSrc : String,
    location : String,
});

const userSchema = new mongoose.Schema({
    scholarid : Number,
    name : String,
    email : String,
    branch : String,
    password: String,
    issues : Array,
});

userSchema.plugin(passportLocalMongoose);

const Issue = new mongoose.model("Issue", issueSchema);
const User = new mongoose.model("User", userSchema);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Have Node serve the files for React app
app.use(express.static(path.join(__dirname, "client", "build")))

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });

app.post("/addissue", (req, res) => {
    const issue = new Issue(req.body);
    issue.save();
    console.log(issue);
})






app.get("*", (req, res) => {
    app.use(express.static(path.join(__dirname, "client", "build")));
  });
  
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
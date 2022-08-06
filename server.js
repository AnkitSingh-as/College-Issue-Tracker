require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();

const session = require("express-session");
const passport = require("passport");
//passport-local installed, do not have to set
const passportLocalMongoose = require("passport-local-mongoose");
const { redirect } = require("express/lib/response");
const { runInNewContext } = require("vm");
const LocalStrategy = require('passport-local').Strategy;
const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
let userDetails = {};
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const findOrCreate = require('mongoose-find-or-create');

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
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// need this to parse the json with the req
app.use(express.json({ limit: '50mb' }));
app.use(express.text());

//connect to Mongo
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Now connected to MongoDB!"))
  .catch((err) => console.error("Something went wrong", err));


const issueSchema = new mongoose.Schema({
  key: Number,
  id: Number,
  title: String,
  description: String,
  author: Number,
  creationDate: String,
  solvedDate: String,
  status: String,
  likes: {type: Array , default : [ [], []]},
  imgSrc: String,
  location: String,
  authorname: String,
});

const userSchema = new mongoose.Schema({
  username: Number,
  scholarid: Number,
  name: String,
  email: String,
  branch: String,
  password: String,
  issues: { type: Array, default: [] },
  isAdmin : {type : Boolean, default : false},
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const Issue = new mongoose.model("Issue", issueSchema);
const User = new mongoose.model("User", userSchema);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));

// Have Node serve the files for React app
app.use(express.static(path.join(__dirname, "client", "build")))

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));

});

app.get('/getIssue', (req, res) => {
  Issue.find({}, (err, foundIssues) => {
    if (!err) {
      res.send(foundIssues);
    }
    else {
      console.log('Issues couldn\'t be sent');
    }
  })
})

app.post('/getUser', (req, res) => {

  const { scholarid } = req.body;
  console.log(scholarid);

  User.find({ scholarid: scholarid }, (err, foundUser) => {
    if (!err) {
      console.log(foundUser);
      res.send(foundUser);
    }
    else {
      console.log('User couldn\'t be found');
    }
  })
})

app.post("/addIssue", (req, res) => {

  const issue = new Issue(req.body);
  issue.save();
  console.log(req.body);
  res.send(req.body);
})


app.get('/loggedIn', (req, res) => {
  if (req.isAuthenticated()) {
    res.send({
      data: req.user,
      login: true
    });
  }
  else {
    res.send({ data: null, login: false });
  }
})

app.post('/login', (req, res) => {
  console.log('trying to log in backend')
  let { username, password } = req.body;
  // console.log(scholarid, password);
  const user = new User({
    username: username,
    password: password,
  });

 
  req.login(user, (err) => {
     
    if(err) {
      console.log(err);
    }
    else{
      passport.authenticate( 'local') (req, res, function () {
        console.log('user loggedin' ,  req.user);
          res.send({
            data : req.user,
            login : true,
          })
      })
    }
  })

})
  app.post('/logout', (req, res) => {
    req.logout(
      function (err) {
        if (!err) {
          req.session.destroy((err) => {
            if (err) {
              console.log(err);
            }
            else {
              console.log('user logged out');
              res.send({
                data: null,
                login: false,
              })
            }
          });
        }
        else {
          console.log(err);
        }
      }
    );

  });

  app.post('/register', (req, res) => {
    let { email, name, username, scholarid, branch, issues, password } = req.body
    const usr = {
      username,
      scholarid,
      name,
      email,
      branch,
    };
    console.log(username, email, name, branch, password);
    console.log(usr);
    User.register(usr, password, function (err, user) {
      if (err) {
        console.log(err);
      }
      else {
        passport.authenticate('local')(req, res, function () {
          console.log('User registered');
          res.send({
            data: req.body,
            login: true
          });
        });
      }
    });
  });




  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

  app.post('/updateLike', (req, res) => {
    const {likes, id} = req.body;
    console.log(likes, id, 'updating issue');
    Issue.find({id : id}, (err, foundItem)  => {
      if(!err){
          Issue.findOneAndUpdate( { id : id} ,  {
            likes : likes,
          },  (err, foundItem) => {
            if(!err){
              console.log('updated');
              res.status(200).json({success :  true});
            }
          } )
      }
    } )
  })
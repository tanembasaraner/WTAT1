"use strict";

const express = require("express"),
  app = express(),
  router = require("./routes/index"),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  expressValidator = require("express-validator"),
  passport = require("passport"),
  homeController = require("./controllers/homeController.js"),
  errorController = require("./controllers/errorController.js"),
  subscribersController = require("./controllers/subscribersController.js"),
  travelPackagesController = require("./controllers/travelPackagesController.js"),
  usersController = require("./controllers/usersController"),
  TravelPackage = require("./models/travelPackage.js"),
  // Agent = require("./models/agent.js"),
  User = require("./models/user");

mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://localhost:27017/trays_travels",
  { useNewUrlParser: true }
);
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));


const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

app.use(express.json());
app.use(cookieParser("secret_passcode"));
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(connectFlash());

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});
app.use(expressValidator());

app.get("/", (req, res) => {
  res.send("Welcome to TRAYS Travels!");
});

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(
    `Server running at http://localhost:${app.get("port")}`);
});
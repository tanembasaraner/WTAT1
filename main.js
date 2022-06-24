const homeController = require("./controllers/homeController.js");
const errorController = require("./controllers/errorController.js");
const subscribersController = require("./controllers/subscribersController.js");
const travelPackagesController = require("./controllers/travelPackagesController.js");
const usersController = require("./controllers/usersController");
const TravelPackage = require("./models/travelPackage.js")
const Agent = require("./models/agent.js")
const express = require("express");
const layouts = require("express-ejs-layouts");
const app = express();
const router = express.Router();
const methodOverride = require("method-override");
const expressValidator =require("express-validator") ;
const User = require("./models/user");
const passport = require("passport");


router.use(
    methodOverride("_method", {
      methods: ["POST", "GET"]
    })
  );

const mongoose = require("mongoose");//set up mongoose
mongoose.connect(
 "mongodb://localhost:27017/trays_travels",
 {useNewUrlParser: true}
);
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
express.urlencoded({
extended: false
})
);
app.use(express.json());
router.use(expressValidator());
app.use(layouts);
app.use(express.static("public"));
app.use("/", router);

const expressSession = require("express-session"),
 cookieParser = require("cookie-parser"),
 connectFlash = require("connect-flash");
router.use(cookieParser("secret_passcode"));
router.use(expressSession({
 secret: "secret_passcode",
 cookie: {
 maxAge: 4000000
 },
 resave: false,
 saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use(connectFlash());

router.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
 res.locals.currentUser = req.user;
 res.locals.flashMessages = req.flash();

  next();
});
router.use(homeController.logRequestPaths);

router.get("/", homeController.index);
router.get("/contact", homeController.getSubscriptionPage);



const db = mongoose.connection;
db.once("open", () => {
 console.log("Successfully connected to MongoDB using Mongoose!");
});


app.get("/users", usersController.index, usersController.indexView);
app.get("/packages", travelPackagesController.index, travelPackagesController.indexView);
app.get("/subscribers", subscribersController.index, subscribersController.indexView);

router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/login", usersController.login);
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate, usersController.redirectView);
router.get("/users/logout", usersController.logout, usersController.redirectView)
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.post("/users/create", usersController.validate,usersController.create, usersController.redirectView);

router.get("/packages/new", travelPackagesController.new);
router.post("/packages/create", travelPackagesController.create, travelPackagesController.redirectView);
router.get("/packages/:id/edit", travelPackagesController.edit);
router.put("/packages/:id/update", travelPackagesController.update, travelPackagesController.redirectView);
router.delete("/packages/:id/delete", travelPackagesController.delete, travelPackagesController.redirectView);
router.get("/packages/:id", travelPackagesController.show, travelPackagesController.showView);

router.get("/subscribers/new", subscribersController.new);
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
router.delete("/subscribers/:id/delete", subscribersController.delete, subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);



app.listen(app.get("port"), () => {
 console.log(
 `Server running at http://localhost:${app.get(
"port"
 )}`
 );
 });
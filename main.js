const homeController = require("./controllers/homeController.js");
const errorController = require("./controllers/errorController.js");
const subscribersController = require("./controllers/subscribersController.js");
const TravelPackage = require("./models/travelPackage.js")
const Agent = require("./models/agent.js")
const express = require("express");
const layouts = require("express-ejs-layouts");
const app = express();

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
app.use(layouts);
app.use(express.static("public"));


const db = mongoose.connection;
db.once("open", () => {
 console.log("Successfully connected to MongoDB using Mongoose!");
});


const usersController = require("./controllers/usersController");
app.get("/users", usersController.index, usersController.indexView)

app.get("/", (req, res) => {
 res.send("Welcome to TRAYS Travels!");
});


app.get("/packages", homeController.showPackages);

app.get("/subscribers/index", subscribersController.index);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);

//error handling
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
 console.log(
 `Server running at http://localhost:${app.get(
"port"
 )}`
 );
 });

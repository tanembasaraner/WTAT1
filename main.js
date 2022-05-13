const homeController = require("./controllers/homeController.js");
const errorController = require("./controllers/errorController.js");
//set up mongoose
const mongoose = require("mongoose");
mongoose.connect(
 "mongodb://localhost:27017/recipe_db",
 {useNewUrlParser: true}
);
const db = mongoose.connection;
db.once("open", () => {
 console.log("Successfully connected to MongoDB using Mongoose!");
});
const Subscriber = require("./models/subscriber.js")
const TravelPackage = require("./models/travelPackage.js")
const Agent = require("./models/agent.js")


// var subscriber1 = new Subscriber({ //create and save in 2 steps
//  name: "Jon Wexler",
//  email: "jon@jonwexler.com"
// });
// subscriber1.save((error, savedDocument) => {
//  if (error) console.log(error);
//  console.log(savedDocument);
// });
Subscriber.create(
 {
 name: "Jon Wexler",
 email: "jon@jonwexler.com"
 },
 function (error, savedDocument) {
 if (error) console.log(error);
 console.log(savedDocument);
 }
);
//Find subscribers
var myQuery = Subscriber.findOne({
 name: "Jon Wexler"
 })
 .where("email", /wexler/);
myQuery.exec((error, data) => {
 if (data) console.log(data.name);
});
// var travelPackage1 = new TravelPackage({ //create and save in 2 steps
//  country: "Thailand",
//  price:"10000",
//  dates: "20.09.2022-30.09.2022"
// });
// travelPackage1.save((error, savedDocument) => {
//  if (error) console.log(error);
//  console.log(savedDocument);
// });
TravelPackage.create(
 {
   country: "Thailand",
   price:"10000",
   dates:"20.09.2022-30.09.2022"
 },
 function (error, savedDocument) {
 if (error) console.log(error);
 console.log(savedDocument);
 }
);

Agent.create(
 {
 brand_name: "TRAYS",
 email: "TRAYStravels@gmail.com"
 },
 function (error, savedDocument) {
 if (error) console.log(error);
 console.log(savedDocument);
 }
);
Agent.create(
 {
 brand_name: "cost saver",
 email: "CS@gmail.com"
 },
 function (error, savedDocument) {
 if (error) console.log(error);
 console.log(savedDocument);
 }
);
var myQuery2= Agent.findOneAndDelete({ brand_name: "cost saver"},
function(err,docs){
  if(err){
    console.log(err)
  }
  else{
    console.log("deleted user:"+docs);
    }
});



const express = require("express"),
layouts = require("express-ejs-layouts"),
 app = express();

 app.use(express.static("public"));

 app.use(
 express.urlencoded({
 extended: false
 })
);
app.use(express.json());

app.set("view engine", "ejs");
app.use(layouts);

app.set("port", process.env.PORT || 3000);
app.get("/", (req, res) => {
 res.send("Welcome to TRAYS Travels!");
});
app.get("/packages", homeController.showPackages);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

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

const homeController = require("./controllers/homeController.js");
const errorController = require("./controllers/errorController.js");

const MongoDB = require("mongodb").MongoClient,
 dbURL = "mongodb://localhost:27017",
 dbName = "holidays_db";
MongoDB.connect(dbURL, (error, client) => {
 if (error) throw error;
 let db = client.db(dbName);
 db.collection("contacts")
 .find()
 .toArray((error, data) => {
if (error) throw error;
console.log(data);
db.collection("contacts").insert(
     {
       name: "Freddie Mercury",
       email: "fred@queen.com"
     },
     (error, db) => {
       if (error) throw error;
       console.log(db);
     }
   );
 }
);


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

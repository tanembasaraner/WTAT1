const homeController = require("./controllers/homeController.js");
const errorController = require("./controllers/errorController.js");

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

const homeController = require("./controllers/homeController.js");
const port = 3000,
 express = require("express"),
 app = express();
 app.use(
 express.urlencoded({
 extended: false
 })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
});

app.post("/", (req, res) => {
 console.log(req.body);
 console.log(req.query);
 res.send("POST Successful!");
});

app.get("/items/:booking", homeController.sendReqParam);

app.listen(port, () => {
 console.log(`The Express.js server has started and is listening
➥ on port number: ${port}`);
});

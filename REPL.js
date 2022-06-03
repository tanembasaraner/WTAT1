const mongoose = require("mongoose"),
    Subscriber = require("./models/subscriber"),
    TravelPackage = require("./models/travelPackage");
User = require("./models/user")

var testPackage,
    testSubscriber;
mongoose.connect(
    "mongodb://localhost:27017/trays_travels",
    { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

var testUser;
User.create({
    name: {
        first: "Jon",
        last: "Wexler "
    },
    email: "jon@jonwexler.com",
    password: "pass123"
})
    .then(user => {
        testUser = user;
        return Subscriber.findOne({
            email: user.email
        });
    })
    .then(subscriber => {
        testUser.subscribedAccount = subscriber;
        testUser.save().then(user => console.log("user updated"));
    })
    .catch(error => console.log(error.message));
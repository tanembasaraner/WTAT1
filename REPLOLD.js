const mongoose = require("mongoose"),
    Subscriber = require("./models/subscriber"),
    TravelPackage = require("./models/travelPackage");
    User = require("./models/user")

var testPackage,
    testSubscriber;
mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

var testUser;
User.create({
  name: {
    first: "Jon",
    last: "Wexler"
  },
  email: "jon@jonwexler.com",
  password: "pass123"
})
  .then(user => testUser = user)
  .catch(error => console.log(error.message));

  
/* Subscriber.remove({})
    .then((items) => console.log(`Removed ${items.n} records!`))
    .then(() => {
        return TravelPackage.remove({});
    })
    .then((items) => console.log(`Removed ${items.n} records!`))
    .then(() => {
        return Subscriber.create({
            name: "Jon",
            email: "jon@jonwexler.com",
            zipCode: "12345"
        });
    })
    .then(subscriber => {
        console.log(`Created Subscriber: ${subscriber.getInfo()}`);
    })
    .then(() => {
        return Subscriber.findOne({
            name: "Jon"
        });
    })
    .then(subscriber => {
        testSubscriber = subscriber;
        console.log(`Found one subscriber: ${subscriber.getInfo()}`);
    })
    .then(() => {
        return TravelPackage.create({
            country: "Indonesia",
            price: "1000 EUR",
            dates: 2023
        });
    })
    .then(travelPackage => {
        testPackage = travelPackage;
        console.log(`Created package: ${travelPackage.title}`);
    })
    .then(() => {
        testSubscriber.travelPackages.push(testPackage);
        testSubscriber.save();
    })
    .then(() => {
        return Subscriber.populate(testSubscriber, "TravelPackages");
    })
    .then(subscriber => console.log(subscriber))
    .then(() => {
        return Subscriber.find({
            travelPackages: mongoose.Types.ObjectId(
                testPackage._id)
        });
    })
    .then(subscriber => console.log(subscriber)); */
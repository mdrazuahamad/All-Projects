const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

const eventController = require("./Controller/eventsController");

const bookingController = require("./Controller/bookingController");

const userController = require("./Controller/userController");

const paymentController = require("./Controller/paymentController");
const subscriberController = require("./Controller/subscriberController");
const packageController = require("./Controller/packageController");


var app = express();

app.listen(process.env.PORT, () => {
  console.log(`Hey Im Working at ${process.env.PORT}`);
});

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/event/", eventController);

app.use("/booking/", bookingController);

app.use("/user/", userController);

app.use("/payment/", paymentController);
app.use("/subscriber/", subscriberController);
app.use("/userList/", userController);
app.use("/package-list/",packageController);

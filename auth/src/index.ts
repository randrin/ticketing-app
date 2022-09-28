import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { json } from "body-parser";
import { currentUserRouter } from "./routers/current-user";
import { signupRouter } from "./routers/signup";
import { signinRouter } from "./routers/signin";
import { signoutRouter } from "./routers/signout";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
app.use(json());

// Routes Middleware
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();

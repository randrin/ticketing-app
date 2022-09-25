import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routers/current-user";
import { signupRouter } from "./routers/signup";

const app = express();
app.use(json());

// Routes Middleware
app.use(currentUserRouter);
app.use(signupRouter);

app.listen(3000, () => {
  console.log("Listing to port 3000");
});

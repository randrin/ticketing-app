import express from "express";
import "express-async-errors";
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

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Listing to port 3000");
});

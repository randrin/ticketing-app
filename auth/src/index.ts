import express from "express";
import { json } from "body-parser";

const app = express();
app.use(json());

app.get("/api/users/currentuser", (req, res) => {
  res.status(200).json("Hi, i am Randrnio");
});

app.listen(3000, () => {
  console.log("Listing to port 3000");
});

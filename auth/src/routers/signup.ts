import express from "express";
const { userSignupValidator } = require("../validators/auth");
const { runValidation } = require("../validators");

const router = express.Router();

router.post(
  "/api/users/signup",
  userSignupValidator,
  runValidation,
  (req, res) => {
    console.log("req.body: ", req.body);
    const { email, password } = req.body;

    console.log("Creating new user .........");
    
    return res.status(200).send({});
  }
);

export { router as signupRouter };

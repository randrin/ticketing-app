import express from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../model/user";
const { userSignupValidator } = require("../validators/auth");
const { runValidation } = require("../validators");

const router = express.Router();

router.post(
  "/api/users/signup",
  userSignupValidator,
  runValidation,
  async (req, res) => {
    console.log("req.body: ", req.body);
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();

    return res.status(201).send(user);
  }
);

export { router as signupRouter };

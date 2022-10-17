import express from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../model/user";
const { userSignupValidator } = require("../validators/auth");
const { runValidation } = require("../validators");
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signup",
  userSignupValidator,
  runValidation,
  async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!, {
      expiresIn: "7d",
    }); // ! don't check the undefined
    req.session = {
      jwt: token,
    };

    return res.status(201).send(user);
  }
);

export { router as signupRouter };

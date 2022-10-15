import express from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../model/user";
import { Password } from "../services/password";
const { userSigninValidator } = require("../validators/auth");
const { runValidation } = require("../validators");
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  userSigninValidator,
  runValidation,
  async (req, res) => {
    console.log("req.body: ", req.body);
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch = await Password.compare(existingUser!.password, password);
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    const token = jwt.sign(
      { id: existingUser!.id, email: existingUser!.email },
      process.env.JWT_KEY!,
      {
        expiresIn: "7d",
      }
    ); // ! don't check the undefined
    req.session = {
      jwt: token,
    };

    return res.status(200).send(existingUser);
  }
);

export { router as signinRouter };

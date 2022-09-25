import { check } from "express-validator";

exports.userSignupValidator = [
  // check("pseudo")
  //   .isLength({ min: 6 })
  //   .withMessage("Pseudo must be at least 6 characters long"),
  // check("fullname")
  //   .not()
  //   .isEmpty()
  //   .withMessage("Full name is required")
  //   .isLength({ min: 6 })
  //   .withMessage("Full name must be at least 6 characters long")
  //   .not()
  //   .isNumeric()
  //   .withMessage("Full name must not contains numbers"),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.userSigninValidator = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.forgotPasswordValidator = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Must be a valid email address"),
];

exports.resetPasswordValidator = [
  check("newPassword")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

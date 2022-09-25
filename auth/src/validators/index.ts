import { NextFunction, Request, Response } from "express";
const { validationResult } = require("express-validator");

exports.runValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("runValidation errors: ", errors);
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  next();
};

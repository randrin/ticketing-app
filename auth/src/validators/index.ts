import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
const { validationResult } = require("express-validator");

exports.runValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};

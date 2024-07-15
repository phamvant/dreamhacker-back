import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../utils/error.response.js";

// Validation middleware
export const createPostSchema = [
  body("content").isString().withMessage("Invalid Content"),
  body("title")
    .isLength({ min: 20 })
    .withMessage("Title must be at least 20 characters"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError({ message: JSON.stringify(errors.array()) });
    }
    next();
  },
];

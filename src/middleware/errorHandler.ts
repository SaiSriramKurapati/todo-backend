import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ApiError } from "../utils/ApiError";

export const errorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ error: err.message });
    return; 
  }
 
  res.status(500).json({ error: "Internal server error" });
};

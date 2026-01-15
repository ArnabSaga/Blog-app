import { NextFunction, Request, Response } from "express";

function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.json({
    message: "Error from error handler",
    error: err,
  });
}

export default globalErrorHandler;

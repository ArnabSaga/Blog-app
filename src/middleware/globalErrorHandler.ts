import { NextFunction, Request, Response } from "express";

import { Prisma } from "../../generated/prisma/client";
import { PrismaClientInitializationError } from "@prisma/client/runtime/client";

function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  let errorDetails = err;

  //! PrismaClientValidationError
  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "Your provider field type is incorrect | missing fields";
  }

  //! PrismaClientKnownRequestError
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 400;
      errorMessage =
        "An operation failed because it depends on one or more records that were required but not found.";
    } else if (err.code === "P2002") {
      statusCode = 400;
      errorMessage = "Unique constraint failed on the";
    } else if (err.code === "P2007") {
      statusCode = 400;
      errorMessage = "Your Data validation";
    } else if (err.code === "P2003") {
      statusCode = 400;
      errorMessage = "Foreign key constraint failed on the field";
    }
  }
  //! PrismaClientUnknownRequestError
  else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMessage = "Error occurred during query execution";
  }

  //! PrismaClientInitializationError
  else if (err instanceof PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 401;
      errorMessage = "Authentication failed. Please check your creditials";
    } else if (err.errorCode === "P1001") {
      statusCode = 400;
      errorMessage = "Can not reach database server";
    }
  }

  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: errorDetails,
  });
}

export default globalErrorHandler;

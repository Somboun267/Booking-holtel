import type { Response } from "express";
import { HttpStatus } from "./httpStatus.js";

interface ResponseData {
  status?: number;
  message?: string;
  data?: unknown;
}

export const successResponse = (
  res: Response,
  {
    status = HttpStatus.OK,
    message = "Success",
    data = null,
  }: ResponseData
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  res: Response,
  {
    status = HttpStatus.INTERNAL_SERVER_ERROR,
    message = "Error",
  }: {
    status?: number;
    message?: string;
  }
) => {
  return res.status(status).json({
    success: false,
    message,
    data: null,
  });
};
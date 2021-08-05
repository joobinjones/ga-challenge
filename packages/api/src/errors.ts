import { Request, Response, NextFunction } from "express";

export interface Error {
  status: number;
  message: string;
}

export const asyncErrorBoundary = (
  delegate: Function,
  defaultStatus: number | null | undefined
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve()
      .then(() => delegate(req, res, next))
      .catch((error = {}) => {
        const { status = defaultStatus, message = error } = error;
        next({ status, message });
      });
  };
};

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
};

export const methodNotAllowed = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next({ status: 405, message: `${req.method} not allowed for ${req.originalUrl}` });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next({ status: 404, message: `Path not found: ${req.originalUrl}` });
};

export const asyncErrorBoundary = (delegate, defaultStatus) => {
  return (req, res, next) => {
    Promise.resolve()
      .then(() => delegate(req, res, next))
      .catch((error = {}) => {
        const { status = defaultStatus, message = error } = error;
        next({ status, message });
      });
  };
};

export const errorHandler = (error, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
};

export const methodNotAllowed = (req, res, next) => {
  next({ status: 405, message: `${req.method} not allowed for ${req.originalUrl}` });
};

export const notFound = (req, res, next) => {
  next({ status: 404, message: `Path not found: ${req.originalUrl}` });
};

// middleware/error-middleware.js
const errorMiddleware = (err, req, res, next) => {
  console.error("Backend Error:", err);

  res.status(err.status || 500).json({
    message: err.message || "Backend Error",
    extraDetails: err.stack || "Error from the Backend"
  });
};

module.exports = errorMiddleware;

export function notFound(req, res, next){
  res.status(404).json({ message: "Route not found" });
}

export function errorHandler(err, req, res, next){
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack
  });
}

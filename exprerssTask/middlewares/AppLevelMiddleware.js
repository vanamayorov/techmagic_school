class AppLevelMiddleware {
  page404(req, res, next) {
    const err = new Error("Page not found");
    err.status = 404;
    next(err);
  }

  handleErrors(err, req, res, next) {
    res.status(err.status || 500).json({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    });
  }
}

export default new AppLevelMiddleware();

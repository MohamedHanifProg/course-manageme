const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log error stack trace
    res.status(err.status || 500).json({
      error: err.message || 'An internal server error occurred.',
    });
  };
  
  module.exports = errorHandler;
  
module.exports = (err, req, res, next) => {
  let statusCode = 500;

  let data = {
    success: false,
    message: err.message
  };

  if (err.name === `ValidationError`) {
    data.message = err.message;
    statusCode = 400;

    data.errors = [];
    const errors = err.errors;

    for (let key in errors) {
      if ({}.hasOwnProperty.call(errors, key)) {
        data.errors.push({
          field: key,
          message: errors[key].message
        });
      }
    }
  }

  res.status(statusCode).send(data);
  next();
};

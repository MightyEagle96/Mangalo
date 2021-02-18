const AppError = require('../utils/appError');

const handleValidationError = (err, res) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const fields = Object.values(err.errors).map((el) => el.path);

  const code = 400;

  // if the error message is greater than 1
  if (errors.length > 1) {
    const formattedErrors = errors.join(' ');

    res.status(code).json({ messages: formattedErrors, fields });
  } else {
    res.status(code).json({ messages: errors[0], fields: fields[0] });
  }
};
module.exports = (err, req, res, next) => {
  try {
    if (err.name === 'ValidationError') {
      console.log(err);
      return (err = handleValidationError(err, res));
    }
  } catch (error) {
    res.status(500).json({ message: 'An unknown error occurred' });
  }
};

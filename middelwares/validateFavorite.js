const { HttpError } = require('../helpers');

const validateFavorite = schema => {
  const func = (req, res, next) => {
    const validateFile = schema.validate(req.body);
    if (validateFile.error) {
      const errorMessage = validateFile.error.details[0].message;
      return next(HttpError(400, errorMessage));
    }
    next();
  };
  return func;
};

module.exports = validateFavorite;

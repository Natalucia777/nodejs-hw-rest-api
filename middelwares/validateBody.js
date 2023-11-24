const { HttpError } = require('../helpers');

const validateBody = schema => {
  const func = (req, res, next) => {
    const validateFile = schema.validate(req.body);

    if (validateFile.error) {
      if (Object.keys(req.body).length === 0) {
        next(HttpError(400, `missing field`));
      } else {
        next(HttpError(400, validateFile.error.message));
      }
    }
    next();
  };
  return func;
};

module.exports = validateBody;

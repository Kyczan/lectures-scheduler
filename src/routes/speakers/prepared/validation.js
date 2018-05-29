const Joi = require('joi');

module.exports = function validatePrepared(prepared) {
  const schema = {
    lecture_id: Joi.number().required()
  };
  return Joi.validate(prepared, schema);
};

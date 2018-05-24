const Joi = require('joi');

module.exports = function validateSetting(setting) {
  const schema = {
    value: Joi.string().required()
  };
  return Joi.validate(setting, schema);
};

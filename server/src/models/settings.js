import Joi from 'joi';

export default function validateSetting(setting) {
  const schema = {
    value: Joi.string().required()
  };
  return Joi.validate(setting, schema);
}

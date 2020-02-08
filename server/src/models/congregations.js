import Joi from 'joi';

export default function validateCongregation(congregation) {
  const schema = {
    name: Joi.string().required()
  };
  return Joi.validate(congregation, schema);
}

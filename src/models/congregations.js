import Joi from 'joi';

export default function validateCongregation(congregation) {
  const schema = {
    number: Joi.number().required(),
    name: Joi.string().required()
  };
  return Joi.validate(congregation, schema);
};

import Joi from 'joi';

export default function validateUser(user) {
  const schema = {
    name: Joi.string().required(),
    userId: Joi.string().required()
  };
  return Joi.validate(user, schema);
}

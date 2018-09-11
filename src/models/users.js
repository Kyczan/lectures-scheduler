import Joi from 'joi';

export default function validateUser(user) {
  const schema = {
    id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required()
  };
  return Joi.validate(user, schema);
}

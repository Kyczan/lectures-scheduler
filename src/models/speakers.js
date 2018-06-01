import Joi from 'joi';

export default function validateSpeaker(speaker) {
  const schema = {
    congregation_id: Joi.number().allow('', null).required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone: Joi.string().regex(/^[0-9]{9}$/).allow('', null).required(),
    email: Joi.string().email().allow('', null).required(),
    privilege: Joi.string().allow('', null).required(),
    note: Joi.string().allow('', null).required()
  };
  return Joi.validate(speaker, schema);
}

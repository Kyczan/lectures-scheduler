import Joi from 'joi';

export default function validateSpeaker(speaker) {
  const schema = {
    congregation_id: Joi.number().allow('', null).required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    note: Joi.string().allow('', null).required()
  };
  return Joi.validate(speaker, schema);
}

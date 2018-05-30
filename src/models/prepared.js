import Joi from 'joi';

export default function validatePrepared(prepared) {
  const schema = {
    lecture_id: Joi.number().required()
  };
  return Joi.validate(prepared, schema);
};

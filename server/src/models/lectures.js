import Joi from 'joi';

export default function validateLecture(lecture) {
  const schema = {
    number: Joi.number().required(),
    title: Joi.string().required(),
    note: Joi.string()
      .allow('', null)
      .required()
  };
  return Joi.validate(lecture, schema);
}

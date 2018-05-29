import Joi from 'joi';

export default function validateLecture(lecture) {
  const schema = {
    number: Joi.number().required(),
    title: Joi.string().required()
  };
  return Joi.validate(lecture, schema);
}

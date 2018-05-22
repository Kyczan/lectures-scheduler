const Joi = require('joi');

module.exports = function validateEvent(event) {
  const schema = {
    speaker_id: Joi.number().allow('', null).required(),
    lecture_id: Joi.number().allow('', null).required(),
    event_date: Joi.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/).required(),
    event_time: Joi.string().regex(/^[0-9]{2}:[0-9]{2}$/).required(),
    note: Joi.string().allow('', null).required()
  };
  return Joi.validate(event, schema);
};

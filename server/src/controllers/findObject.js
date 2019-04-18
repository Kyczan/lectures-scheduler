import Joi from 'joi';
import db from '../db';

export default sql => {
  return async (req, res, next, value) => {
    const { error } = Joi.validate(value, Joi.string().required());
    if (error) return res.status(404).send('Invalid ID');

    const data = await db.query(sql.findOne, {
      replacements: [value],
      type: db.QueryTypes.SELECT
    });
    if (data.length) {
      req['returnedData'] = data[0];
      next();
    } else {
      res.status(404).send('Invalid ID');
    }
  };
};

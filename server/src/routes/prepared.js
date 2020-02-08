import { Router } from 'express';
import Joi from 'joi';
import db, { prepared as sql } from '../db';
import ctl from '../controllers/preparedController';

const prepared = Router({ mergeParams: true });

prepared.param('lectureId', async (req, res, next, value) => {
  const { error } = Joi.validate(value, Joi.number().required());
  if (error) return res.status(404).send('Invalid ID');

  const data = await db.query(sql.findOne, {
    replacements: [req.params.speakerId, value]
  });
  if (data.length) {
    req['returnedData'] = data[0][0];
    next();
  } else {
    res.status(404).send('Invalid ID');
  }
});

prepared.get('/', ctl.findAll);
prepared.get('/:lectureId', ctl.findOne);
prepared.post('/', ctl.create);
prepared.delete('/:lectureId', ctl.remove);

export default prepared;

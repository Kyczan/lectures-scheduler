import { Router } from 'express';
import Joi from 'joi';
import Promise from 'bluebird';
import sqlite from 'sqlite';
import dbConf from '../config/database';
import sql from '../queries/prepared';
import ctl from '../controllers/preparedController';

const dbPromise = sqlite.open(dbConf.dbPath, { Promise });
const prepared = Router();

prepared.param( 'lectureId', async (req, res, next, value) => {

  const { error } = Joi.validate(
    value, 
    Joi.number().required() 
  );
  if (error) return res.status(404).send('Invalid ID');

  const data = await db.get(sql.findOne, [req.params.speakerId, value]);
  if (data) {
    req['returnedData'] = data;
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

import Joi from 'joi';
import Promise from 'bluebird';
import sqlite from 'sqlite';
import dbConf from '../config/database';

const dbPromise = sqlite.open(dbConf.dbPath, { Promise });

export default (sql) => {
  return async (req, res, next, value) => {

    const db = await dbPromise;
    const { error } = Joi.validate(
      value, 
      Joi.number().required() 
    );
    if (error) return res.status(404).send('Invalid ID');

    const data = await db.get(sql.findOne, [value]);
    if (data) {
      req['returnedData'] = data;
      next();
    } else {
      res.status(404).send('Invalid ID');
    }
  };
};
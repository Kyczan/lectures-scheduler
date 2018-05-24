const Joi = require('joi');
const settings = require('express').Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('./sql');
const one = require('./methods/one');
const upd = require('./methods/upd');

settings.param( 'settingName', (req, res, next, value) => {

  const { error } = Joi.validate(
    value, 
    Joi.string().required() 
  );
  if (error) return res.status(404).send('Invalid ID');

  db.get(sql.one, [value], (err, data) => {
    if (data) {
      req['returnedData'] = data.value;
      next();
    } else {
      res.status(404).send('Invalid ID');
    }
  });
});

settings.get('/:settingName', one);
settings.put('/:settingName', upd);

module.exports = settings;

const Joi = require('joi');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

module.exports = (sql) => {
  return (req, res, next, value) => {

    const { error } = Joi.validate(
      value, 
      Joi.number().required() 
    );
    if (error) return res.status(404).send('Invalid ID');

    db.get(sql.one, [value], (err, data) => {
      if (data) {
        req['returnedData'] = data;
        next();
      } else {
        res.status(404).send('Invalid ID');
      }
    });
  };
};
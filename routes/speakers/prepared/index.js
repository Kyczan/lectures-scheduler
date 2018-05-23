const prepared = require('express').Router({ mergeParams: true });
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('./sql');
const all = require('./methods/all');
const one = require('./methods/one');
const add = require('./methods/add');
const del = require('./methods/del');

prepared.param( 'lectureId', (req, res, next, value) => {
  db.get(sql.one, [req.params.speakerId, value], (err, data) => {
    if (data) {
      req['returnedData'] = data;
      next();
    } else {
      res.status(404).send(`Invalid ID`);
    }
  });
});

prepared.get('/', all);
prepared.get('/:lectureId', one);
prepared.post('/', add);
prepared.delete('/:lectureId', del);

module.exports = prepared;

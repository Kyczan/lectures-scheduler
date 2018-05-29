const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

import sql from './sql';
const validateCongregation = require('../models/congregations');

module.exports = {

  async findAll (req, res) {
    const congregations = await db.all(sql.all, []);
    if (congregations.length === 0) return res.status(404).send('There is no congregations');
    return res.status(200).json(congregations);
  },

  findOne (req, res, next) {
    res.status(200).json(req.returnedData);
  },

  create (req, res) {
    const { error } = validateCongregation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const params = [
      +req.body.number,
      req.body.name
    ];
    
    db.run(sql.add, params, function (err) {
      db.get(sql.one, [this.lastID], (err, data) => 
        res.status(201).json(data));
    });
  },

  update (req, res, next) {
    const { error } = validateCongregation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const congregationId = +req.params.congregationId;
    const params = [
      +req.body.number,
      req.body.name,
      congregationId
    ];
    
    db.run(sql.upd, params, err =>
      db.get(sql.one, [congregationId], (err, data) => 
        res.status(200).json(data)));
  },

  remove (req, res, next) {
    const congregationId = +req.params.congregationId;
    db.run(sql.del.congregations, [congregationId])
      .run(sql.del.speakers, [congregationId], (err) => 
        res.status(200).json(req.returnedData));
  }
};

import Promise from 'bluebird';
import sqlite from 'sqlite';
import dbConf from '../config/database';
import sql from '../queries/congregations';
import validateCongregation from '../models/congregations';

const dbPromise = sqlite.open(dbConf.dbPath, { Promise });

export default {

  async findAll (req, res) {
    
    const db = await dbPromise;
    const congregations = await db.all(sql.findAll, []);
    if (congregations.length === 0) return res.status(404).send('There is no congregations');
    return res.status(200).json(congregations);
  },

  findOne (req, res, next) {

    res.status(200).json(req.returnedData);
  },

  async create (req, res) {

    const { error } = validateCongregation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const params = [
      +req.body.number,
      req.body.name
    ];
    
    const db = await dbPromise;
    const { lastID } = await db.run(sql.create, params);
    const data = await db.get(sql.findOne, [lastID]);
    res.status(201).json(data);
  },

  async update (req, res, next) {

    const { error } = validateCongregation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const congregationId = +req.params.congregationId;
    const params = [
      +req.body.number,
      req.body.name,
      congregationId
    ];
    
    const db = await dbPromise;
    await db.run(sql.update, params);
    const data = await db.get(sql.findOne, [congregationId])
    res.status(200).json(data);
  },

  async remove (req, res, next) {

    const congregationId = +req.params.congregationId;
    const db = await dbPromise;
    await db.run(sql.remove.congregations, [congregationId]);
    await db.run(sql.remove.speakers, [congregationId]);
    res.status(200).json(req.returnedData);
  }
};

import Promise from 'bluebird';
import sqlite from 'sqlite';
import dbConf from '../config/database';
import sql from '../queries/prepared';
import validatePrepared from '../models/prepared';

const dbPromise = sqlite.open(dbConf.dbPath, { Promise });

export default {

  async findAll (req, res) {
    
    const db = await dbPromise;
    const speakerId = +req.params.speakerId;
    const prepared = await db.all(sql.findAll, [speakerId]);
    if (prepared.length === 0) return res.status(404).send('There is no prepared');
    return res.status(200).json(prepared);
  },

  findOne (req, res) {

    res.status(200).json(req.returnedData);
  },

  async create (req, res) {

    const { error } = validatePrepared(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const speakerId = +req.params.speakerId;
    const params = [
      speakerId,
      +req.body.lecture_id
    ];
    
    const db = await dbPromise;
    const one = await db.get(sql.findOne, params);
    if (one) return res.status(201).json(one);

    await db.run(sql.create, params);
    const data = await db.get(sql.findOne, params);
    res.status(201).json(data);
  },

  async remove (req, res) {

    const params = [
      +req.params.speakerId,
      +req.params.lectureId
    ];
    const db = await dbPromise;
    await db.run(sql.remove, params);
    res.status(200).json(req.returnedData);
  }
};

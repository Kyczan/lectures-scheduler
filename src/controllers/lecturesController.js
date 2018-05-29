import Promise from 'bluebird';
import sqlite from 'sqlite';
import dbConf from '../config/database';
import sql from '../queries/lectures';
import validateLecture from '../models/lectures';

const dbPromise = sqlite.open(dbConf.dbPath, { Promise });

export default {

  async findAll (req, res) {
    
    const db = await dbPromise;
    const lectures = await db.all(sql.findAll, []);
    if (lectures.length === 0) return res.status(404).send('There is no lectures');
    return res.status(200).json(lectures);
  },

  findOne (req, res) {

    res.status(200).json(req.returnedData);
  },

  async create (req, res) {

    const { error } = validateLecture(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const params = [
      +req.body.number,
      req.body.title
    ];
    
    const db = await dbPromise;
    const { lastID } = await db.run(sql.create, params);
    const data = await db.get(sql.findOne, [lastID]);
    res.status(201).json(data);
  },

  async update (req, res) {

    const { error } = validateLecture(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const lectureId = +req.params.lectureId;
    const params = [
      +req.body.number,
      req.body.title,
      lectureId
    ];
    
    const db = await dbPromise;
    await db.run(sql.update, params);
    const data = await db.get(sql.findOne, [lectureId]);
    res.status(200).json(data);
  },

  async remove (req, res) {

    const lectureId = +req.params.lectureId;
    const db = await dbPromise;
    await db.run(sql.remove.lectures, [lectureId]);
    res.status(200).json(req.returnedData);
  }
};

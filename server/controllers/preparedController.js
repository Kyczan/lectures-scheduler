import db, { prepared as sql } from '../db';
import validatePrepared from '../models/prepared';

export default {
  async findAll(req, res) {
    const speakerId = +req.params.speakerId;
    const prepared = await db.query(sql.findAll, [speakerId]);
    //if (prepared.length === 0) return res.status(404).send('There is no prepared');
    return res.status(200).json(prepared);
  },

  findOne(req, res) {
    res.status(200).json(req.returnedData);
  },

  async create(req, res) {
    const { error } = validatePrepared(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const speakerId = +req.params.speakerId;
    const params = [speakerId, +req.body.lecture_id];

    const one = await db.query(sql.findOne, params);
    if (one.length) return res.status(201).json(one[0]);

    await db.query(sql.create, params);
    const data = await db.query(sql.findOne, params);
    res.status(201).json(data[0]);
  },

  async remove(req, res) {
    const params = [+req.params.speakerId, +req.params.lectureId];
    await db.query(sql.remove, params);
    res.status(200).json(req.returnedData);
  }
};

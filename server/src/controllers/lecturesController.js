import db, { lectures as sql } from '../db';
import validateLecture from '../models/lectures';

export default {
  async findAll(req, res) {
    const lectures = await db.query(sql.findAll, {
      type: db.QueryTypes.SELECT
    });
    if (lectures.length === 0)
      return res.status(404).send('There is no lectures');
    return res.status(200).json(lectures);
  },

  findOne(req, res) {
    res.status(200).json(req.returnedData);
  },

  async create(req, res) {
    const { error } = validateLecture(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const params = [+req.body.number, req.body.title];

    const [insertId] = await db.query(sql.create, { replacements: params });
    const data = await db.query(sql.findOne, {
      replacements: [insertId],
      type: db.QueryTypes.SELECT
    });
    res.status(201).json(data[0]);
  },

  async update(req, res) {
    const { error } = validateLecture(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const lectureId = +req.params.lectureId;
    const params = [+req.body.number, req.body.title, lectureId];

    await db.query(sql.update, { replacements: params });
    const data = await db.query(sql.findOne, {
      replacements: [lectureId],
      type: db.QueryTypes.SELECT
    });
    res.status(200).json(data[0]);
  },

  async remove(req, res) {
    const lectureId = +req.params.lectureId;
    await db.query(sql.remove, { replacements: [lectureId] });
    res.status(200).json(req.returnedData);
  }
};

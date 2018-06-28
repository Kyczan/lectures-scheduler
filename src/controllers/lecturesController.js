import db from '../db';
import sql from '../queries/lectures';
import validateLecture from '../models/lectures';

export default {

  async findAll (req, res) {
    
    const lectures = await db.query(sql.findAll, []);
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
    
    const { insertId } = await db.query(sql.create, params);
    const data = await db.query(sql.findOne, [insertId]);
    res.status(201).json(data[0]);
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
    
    await db.query(sql.update, params);
    const data = await db.query(sql.findOne, [lectureId]);
    res.status(200).json(data[0]);
  },

  async remove (req, res) {

    const lectureId = +req.params.lectureId;
    await db.query(sql.remove, [lectureId]);
    res.status(200).json(req.returnedData);
  }
};

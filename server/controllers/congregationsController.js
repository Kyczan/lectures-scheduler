import db, { congregations as sql } from '../db';
import validateCongregation from '../models/congregations';

export default {
  async findAll(req, res) {
    const congregations = await db.query(sql.findAll, {
      type: db.QueryTypes.SELECT
    });
    if (congregations.length === 0)
      return res.status(404).send('There is no congregations');
    return res.status(200).json(congregations);
  },

  findOne(req, res) {
    res.status(200).json(req.returnedData);
  },

  async create(req, res) {
    const { error } = validateCongregation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const params = [+req.body.number, req.body.name];

    const [insertId] = await db.query(sql.create, { replacements: params });
    const data = await db.query(sql.findOne, {
      replacements: [insertId],
      type: db.QueryTypes.SELECT
    });
    res.status(201).json(data[0]);
  },

  async update(req, res) {
    const { error } = validateCongregation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const congregationId = +req.params.congregationId;
    const params = [+req.body.number, req.body.name, congregationId];

    await db.query(sql.update, { replacements: params });
    const data = await db.query(sql.findOne, {
      replacements: [congregationId],
      type: db.QueryTypes.SELECT
    });
    res.status(200).json(data[0]);
  },

  async remove(req, res) {
    const congregationId = +req.params.congregationId;
    await db.query(sql.remove.congregations, {
      replacements: [congregationId]
    });
    await db.query(sql.remove.speakers, { replacements: [congregationId] });
    res.status(200).json(req.returnedData);
  }
};

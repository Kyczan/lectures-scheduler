import db from '../db';
import sql from '../queries/congregations';
import validateCongregation from '../models/congregations';

export default {

  async findAll (req, res) {
    
    const congregations = await db.query(sql.findAll, []);
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
    
    const { insertId } = await db.query(sql.create, params);
    const data = await db.query(sql.findOne, [insertId]);
    res.status(201).json(data[0]);
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
    
    await db.query(sql.update, params);
    const data = await db.query(sql.findOne, [congregationId]);
    res.status(200).json(data[0]);
  },

  async remove (req, res, next) {

    const congregationId = +req.params.congregationId;
    await db.query(sql.remove.congregations, [congregationId]);
    await db.query(sql.remove.speakers, [congregationId]);
    res.status(200).json(req.returnedData);
  }
};

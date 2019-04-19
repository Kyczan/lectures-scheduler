import db, { speakers as sql } from '../db';
import validateSpeaker from '../models/speakers';

export default {
  async findAll(req, res) {
    const speakers = await db.query(sql.findAll, {
      type: db.QueryTypes.SELECT
    });
    if (speakers.length === 0)
      return res.status(404).send('There is no speakers');
    return res.status(200).json(speakers);
  },

  findOne(req, res) {
    res.status(200).json(req.returnedData);
  },

  async create(req, res) {
    const { error } = validateSpeaker(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const params = [
      +req.body.congregation_id,
      req.body.first_name,
      req.body.last_name,
      req.body.phone,
      req.body.email,
      req.body.privilege,
      req.body.note
    ];

    const [insertId] = await db.query(sql.create, { replacements: params });
    const data = await db.query(sql.findOne, {
      replacements: [insertId],
      type: db.QueryTypes.SELECT
    });
    res.status(201).json(data[0]);
  },

  async update(req, res) {
    const { error } = validateSpeaker(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const speakerId = +req.params.speakerId;
    const params = [
      +req.body.congregation_id,
      req.body.first_name,
      req.body.last_name,
      req.body.phone,
      req.body.email,
      req.body.privilege,
      req.body.note,
      speakerId
    ];

    await db.query(sql.update, { replacements: params });
    const data = await db.query(sql.findOne, {
      replacements: [speakerId],
      type: db.QueryTypes.SELECT
    });
    res.status(200).json(data[0]);
  },

  async remove(req, res) {
    const speakerId = +req.params.speakerId;
    await db.query(sql.remove, { replacements: [speakerId] });
    res.status(200).json(req.returnedData);
  }
};

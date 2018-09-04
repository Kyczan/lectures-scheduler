import db, { events as sql } from '../db';
import validateEvent from '../models/events';

export default {
  async findAll(req, res) {
    const events = await db.query(sql.findAll, []);
    if (events.length === 0) return res.status(404).send('There is no events');
    return res.status(200).json(events);
  },

  findOne(req, res) {
    res.status(200).json(req.returnedData);
  },

  async create(req, res) {
    const { error } = validateEvent(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const params = [
      +req.body.speaker_id,
      +req.body.lecture_id,
      req.body.event_date,
      req.body.event_time,
      req.body.note
    ];

    const { insertId } = await db.query(sql.create, params);
    const data = await db.query(sql.findOne, [insertId]);
    res.status(201).json(data[0]);
  },

  async update(req, res) {
    const { error } = validateEvent(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const eventId = +req.params.eventId;
    const params = [
      +req.body.speaker_id,
      +req.body.lecture_id,
      req.body.event_date,
      req.body.event_time,
      req.body.note,
      eventId
    ];

    await db.query(sql.update, params);
    const data = await db.query(sql.findOne, [eventId]);
    res.status(200).json(data[0]);
  },

  async remove(req, res) {
    const eventId = +req.params.eventId;
    await db.query(sql.remove, [eventId]);
    res.status(200).json(req.returnedData);
  }
};

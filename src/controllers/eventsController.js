import Promise from 'bluebird';
import sqlite from 'sqlite';
import dbConf from '../config/database';
import sql from '../queries/events';
import validateEvent from '../models/events';

const dbPromise = sqlite.open(dbConf.dbPath, { Promise });

export default {

  async findAll (req, res) {
    
    const db = await dbPromise;
    const events = await db.all(sql.findAll, []);
    if (events.length === 0) return res.status(404).send('There is no events');
    return res.status(200).json(events);
  },

  findOne (req, res) {

    res.status(200).json(req.returnedData);
  },

  async create (req, res) {

    const { error } = validateEvent(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const params = [
      +req.body.speaker_id,
      +req.body.lecture_id,
      req.body.event_date,
      req.body.event_time,
      req.body.note,
    ];
    
    const db = await dbPromise;
    const { lastID } = await db.run(sql.create, params);
    const data = await db.get(sql.findOne, [lastID]);
    res.status(201).json(data);
  },

  async update (req, res) {

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
    
    const db = await dbPromise;
    await db.run(sql.update, params);
    const data = await db.get(sql.findOne, [eventId]);
    res.status(200).json(data);
  },

  async remove (req, res) {

    const eventId = +req.params.eventId;
    const db = await dbPromise;
    await db.run(sql.remove.events, [eventId]);
    res.status(200).json(req.returnedData);
  }
};

import Promise from 'bluebird';
import sqlite from 'sqlite';
import dbConf from '../config/database';
import sql from '../queries/speakers';
import validateSpeaker from '../models/speakers';

const dbPromise = sqlite.open(dbConf.dbPath, { Promise });

export default {

  async findAll (req, res) {
    
    const db = await dbPromise;
    const speakers = await db.all(sql.findAll, []);
    if (speakers.length === 0) return res.status(404).send('There is no speakers');
    return res.status(200).json(speakers);
  },

  findOne (req, res) {

    res.status(200).json(req.returnedData);
  },

  async create (req, res) {

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
    
    const db = await dbPromise;
    const { lastID } = await db.run(sql.create, params);
    const data = await db.get(sql.findOne, [lastID]);
    res.status(201).json(data);
  },

  async update (req, res) {

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
    
    const db = await dbPromise;
    await db.run(sql.update, params);
    const data = await db.get(sql.findOne, [speakerId]);
    res.status(200).json(data);
  },

  async remove (req, res) {

    const speakerId = +req.params.speakerId;
    const db = await dbPromise;
    await db.run(sql.remove.speakers, [speakerId]);
    res.status(200).json(req.returnedData);
  }
};

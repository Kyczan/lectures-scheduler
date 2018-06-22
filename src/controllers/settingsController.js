import Promise from 'bluebird';
import sqlite from 'sqlite';
import dbConf from '../config/database';
import sql from '../queries/settings';
import validateSetting from '../models/settings';

const dbPromise = sqlite.open(dbConf.dbPath, { Promise });

export default {

  findOne (req, res) {

    res.status(200).json(req.returnedData);
  },

  async update (req, res) {

    const { error } = validateSetting(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const settingName = req.params.settingName;
    const params = [
      req.body.value,
      settingName
    ];
    
    const db = await dbPromise;
    await db.run(sql.update, params);
    const data = await db.get(sql.findOne, [settingName]);
    res.status(200).json(data);
  }
};

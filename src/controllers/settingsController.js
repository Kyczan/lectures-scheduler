import db, { settings as sql } from '../db';
import validateSetting from '../models/settings';

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
    
    await db.query(sql.update, params);
    const data = await db.query(sql.findOne, [settingName]);
    res.status(200).json(data[0]);
  }
};

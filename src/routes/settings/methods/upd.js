const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('../sql');
const validateSetting = require('../validation');

module.exports = (req, res) => {

  const { error } = validateSetting(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const settingName = req.params.settingName;
  const params = [
    req.body.value,
    settingName
  ];
  
  db.run(sql.upd, params, err =>
    db.get(sql.one, [settingName], (err, data) => 
      res.status(200).json(data.value)));
};

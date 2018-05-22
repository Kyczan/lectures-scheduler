const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('../sql');
const validatePrepared = require('../validation');

module.exports = (req, res) => {

  const { error } = validatePrepared(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const speakerId = +req.params.speakerId;
  const params = [
    speakerId,
    +req.body.lecture_id
  ];
  
  db.get(sql.one, params, (err, data) => {
    if (data) return res.status(201).json(data);
    db.run(sql.add, params)
      .get(sql.one, params, (err, data) => 
        res.status(201).json(data));
  });
};

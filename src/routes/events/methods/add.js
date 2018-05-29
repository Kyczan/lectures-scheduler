const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('../sql');
const validateEvent = require('../validation');

module.exports = (req, res) => {

  const { error } = validateEvent(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const params = [
    +req.body.speaker_id,
    +req.body.lecture_id,
    req.body.event_date,
    req.body.event_time,
    req.body.note,
  ];
  
  db.run(sql.add, params, function (err) {
    db.get(sql.one, [this.lastID], (err, data) => 
      res.status(201).json(data));
  });
};

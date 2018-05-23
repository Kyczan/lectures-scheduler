const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('../sql');
const validateSpeaker = require('../validation');

module.exports = (req, res) => {

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
  
  db.run(sql.upd, params, err =>
    db.get(sql.one, [speakerId], (err, data) => 
      res.status(200).json(data)));
};

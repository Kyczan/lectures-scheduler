const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('../sql');
const validateLecture = require('../validation');

module.exports = (req, res) => {

  const { error } = validateLecture(req.body);
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
  
  db.run(sql.add, params, function (err) {
    db.get(sql.one, [this.lastID], (err, data) => 
      res.status(201).json(data));
  });
};

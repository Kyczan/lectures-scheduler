const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('../sql');
const validateLecture = require('../validation');

module.exports = (req, res) => {

  const { error } = validateLecture(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const lectureNumber = +req.body.number;
  const lectureTitle = req.body.title;
  
  db.run(sql.add, [lectureNumber, lectureTitle], function (err) {
    db.get(sql.one, [this.lastID], (err, data) => 
      res.status(201).json(data));
  });
};

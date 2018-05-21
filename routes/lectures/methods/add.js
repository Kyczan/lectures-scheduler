const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('../sql');

module.exports = (req, res) => {
  const lectureNumber = +req.body.number;
  const lectureTitle = req.body.title;
  
  db.run(sql.add, [lectureNumber, lectureTitle], function (err) {
    db.all(sql.one, [this.lastID], (err, data) => 
      res.status(201).json(data));
  });
};

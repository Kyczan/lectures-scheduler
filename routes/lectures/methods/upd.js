const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('../sql');

module.exports = (req, res) => {
  const lectureId = +req.params.lectureId;
  const lectureNumber = +req.body.number;
  const lectureTitle = req.body.title;
  
  db.run(sql.upd, [lectureNumber, lectureTitle, lectureId], err =>
    db.all(sql.one, [lectureId], (err, data) => 
      res.status(200).json(data)));
};
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('./sql');

module.exports = (req, res) => {
  const lectureId = req.params.lectureId * 1;
  db.all(sql.single, [lectureId], (err, data) => 
    res.status(200).json(data));
};

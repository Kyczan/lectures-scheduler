const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('../sql');

module.exports = (req, res) => {
  const params = [
    +req.params.speakerId,
    +req.params.lectureId
  ];

  db.run(sql.del, params, (err) => 
    res.status(200).json(req.returnedData));
}

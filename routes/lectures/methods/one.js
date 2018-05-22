const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('../sql');

module.exports = (req, res) => {
  const lectureId = +req.params.lectureId;
  db.get(sql.one, [lectureId], (err, data) => {
    if (!data) return res.status(404).send('There is no lecture with given id');
    res.status(200).json(data);
  });
};

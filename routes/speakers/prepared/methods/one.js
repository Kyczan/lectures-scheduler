const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('../sql');

module.exports = (req, res) => {
  const params = [
    +req.params.speakerId,
    +req.params.lectureId
  ];

  db.get(sql.one, params, (err, data) => {
    if (!data) return res.status(404).send('There is no prepared lecture with given id');
    res.status(200).json(data);
  });
};

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('../sql');

module.exports = (req, res) => {
  const speakerId = +req.params.speakerId;
  db.get(sql.one, [speakerId], (err, data) => {
    if (!data) return res.status(404).send('There is no speaker with given id');
    res.status(200).json(data);
  });
};

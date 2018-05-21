const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('./sql');

module.exports = (req, res) => {
  db.all(sql.all, [], (err, data) => 
    res.status(200).json(data));
};

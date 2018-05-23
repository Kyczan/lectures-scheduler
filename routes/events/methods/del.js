const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('../sql');

module.exports = (req, res) => {
  const eventId = +req.params.eventId;
  db.run(sql.del, [eventId], (err) => 
    res.status(200).json(req.returnedData));
};

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('../sql');

module.exports = (req, res) => {
  const eventId = +req.params.eventId;
  db.get(sql.one, [eventId], (err, data) => {
    if (!data) return res.status(404).send('There is no event with given id');
    db.run(sql.del, [eventId], (err) => 
      res.status(200).json(data));
  })
  
};

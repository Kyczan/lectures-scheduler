const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('../sql');

module.exports = (req, res) => {
  const congregationId = +req.params.congregationId;
  db.get(sql.one, [congregationId], (err, data) => {
    if (!data) return res.status(404).send('There is no congregation with given id');
    db.run(sql.del.congregations, [congregationId])
      .run(sql.del.speakers, [congregationId], (err) => 
        res.status(200).json(data));
  }) 
};

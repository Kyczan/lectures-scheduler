const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('../sql');
const validateCongregation = require('../validation');

module.exports = (req, res) => {

  const { error } = validateCongregation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const congregationId = +req.params.congregationId;
  const params = [
    +req.body.number,
    req.body.name,
    congregationId
  ];
  
  db.run(sql.upd, params, err =>
    db.get(sql.one, [congregationId], (err, data) => {
      if (!data) return res.status(404).send('There is no congregation with given id');
      res.status(200).json(data)
    })
  );
};

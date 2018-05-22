const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('../sql');
const validateLecture = require('../validation');

module.exports = (req, res) => {

  const { error } = validateLecture(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const lectureId = +req.params.lectureId;
  const lectureNumber = +req.body.number;
  const lectureTitle = req.body.title;
  
  db.run(sql.upd, [lectureNumber, lectureTitle, lectureId], err =>
    db.get(sql.one, [lectureId], (err, data) => {
      if (!data) return res.status(404).send('There is no lecture with given id');
      res.status(200).json(data)
    })
  );
};

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(`${global.appRoot}/db/planer.db`);

const sql = require('./sql');

module.exports = (req, res) => {
  const lectureNumber = 1000;
  const lectureTitle = 'Testowy wykład';
  const date = '2018-05-20 22:06:00';
  
  db.run(sql.add, [lectureNumber, lectureTitle, date], function (err) {
    db.all(sql.single, [this.lastID], (err, data) => 
      res.status(201).json(data));
  });
};

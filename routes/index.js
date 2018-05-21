const routes = require('express').Router();
const lectures = require('./lectures');

routes.use('/lectures', lectures);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;
const routes = require('express').Router();
const lectures = require('./lectures');
const congregations = require('./congregations');

routes.use('/lectures', lectures);
routes.use('/congregations', congregations);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;
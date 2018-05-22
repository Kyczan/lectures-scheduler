const routes = require('express').Router();

const lectures = require('./lectures');
const congregations = require('./congregations');
const speakers = require('./speakers');

routes.use('/lectures', lectures);
routes.use('/congregations', congregations);
routes.use('/speakers', speakers);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;
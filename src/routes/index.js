const routes = require('express').Router();

const lectures = require('./lectures');
const congregations = require('./congregations');
const speakers = require('./speakers');
const events = require('./events');
const settings = require('./settings');

routes.use('/lectures', lectures);
routes.use('/congregations', congregations);
routes.use('/speakers', speakers);
routes.use('/events', events);
routes.use('/settings', settings);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;
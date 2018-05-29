import { Router } from 'express';
import lectures from './lectures';
import congregations from './congregations';
// import speakers from './speakers';
import events from './events';
import settings from './settings';

const routes = Router();

routes.use('/lectures', lectures);
routes.use('/congregations', congregations);
// routes.use('/speakers', speakers);
routes.use('/events', events);
routes.use('/settings', settings);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

export default routes;

import { Router } from 'express';
import findObject from '../controllers/findObject';
import { events as sql } from '../db';
import ctl from '../controllers/eventsController';

const events = Router();

events.param('eventId', findObject(sql));

events.get('/', ctl.findAll);
events.get('/:eventId', ctl.findOne);
events.post('/', ctl.create);
events.delete('/:eventId', ctl.remove);
events.put('/:eventId', ctl.update);

export default events;

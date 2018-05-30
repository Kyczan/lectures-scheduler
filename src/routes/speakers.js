import { Router } from 'express';
import findObject from '../controllers/findObject';
import sql from '../queries/speakers';
import ctl from '../controllers/speakersController';
import prepared from './speakers/prepared';

const speakers = Router();

speakers.param('speakerId', findObject(sql));

speakers.get('/', ctl.findAll);
speakers.get('/:speakerId', ctl.findOne);
speakers.post('/', ctl.create);
speakers.delete('/:speakerId', ctl.remove);
speakers.put('/:speakerId', ctl.update);

speakers.use('/:speakerId/prepared', prepared);

export default speakers;

import { Router } from 'express';
import findObject from '../controllers/findObject';
import sql from '../queries/congregations';
import ctl from '../controllers/congregationsController';

const congregations = Router();

congregations.param('congregationId', findObject(sql));

congregations.get('/', ctl.findAll);
congregations.get('/:congregationId', ctl.findOne);
congregations.post('/', ctl.create);
congregations.delete('/:congregationId', ctl.remove);
congregations.put('/:congregationId', ctl.update);

export default congregations;

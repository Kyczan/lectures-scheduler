import { Router } from 'express';
import findObject from '../controllers/findObject';
import sql from '../queries/lectures';
import ctl from '../controllers/lecturesController';

const lectures = Router();

lectures.param('lectureId', findObject(sql));

lectures.get('/', ctl.findAll);
lectures.get('/:lectureId', ctl.findOne);
lectures.post('/', ctl.create);
lectures.delete('/:lectureId', ctl.remove);
lectures.put('/:lectureId', ctl.update);

export default lectures;

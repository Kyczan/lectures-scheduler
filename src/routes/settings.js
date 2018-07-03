import { Router } from 'express';
import findObject from '../controllers/findObject';
import { settings as sql } from '../db';
import ctl from '../controllers/settingsController';

const settings = Router();

settings.param('settingName', findObject(sql));

settings.get('/:settingName', ctl.findOne);
settings.put('/:settingName', ctl.update);

module.exports = settings;

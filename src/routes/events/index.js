const events = require('express').Router();

const findObject = require('../findObject');
const sql = require('./sql');
const all = require('./methods/all');
const one = require('./methods/one');
const add = require('./methods/add');
const del = require('./methods/del');
const upd = require('./methods/upd');

events.param('eventId', findObject(sql));

events.get('/', all);
events.get('/:eventId', one);
events.post('/', add);
events.delete('/:eventId', del);
events.put('/:eventId', upd);

module.exports = events;

const lectures = require('express').Router();

const findObject = require('../findObject');
const sql = require('./sql');
const all = require('./methods/all');
const one = require('./methods/one');
const add = require('./methods/add');
const del = require('./methods/del');
const upd = require('./methods/upd');

lectures.param('lectureId', findObject(sql));

lectures.get('/', all);
lectures.get('/:lectureId', one);
lectures.post('/', add);
lectures.delete('/:lectureId', del);
lectures.put('/:lectureId', upd);

module.exports = lectures;

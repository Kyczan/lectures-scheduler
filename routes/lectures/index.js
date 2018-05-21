const lectures = require('express').Router();

const all = require('./methods/all');
const one = require('./methods/one');
const add = require('./methods/add');
const del = require('./methods/del');
const upd = require('./methods/upd');

lectures.get('/', all);
lectures.get('/:lectureId', one);
lectures.put('/',add);
lectures.delete('/:lectureId',del);
lectures.post('/:lectureId',upd);

module.exports = lectures;

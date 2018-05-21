const lectures = require('express').Router();

const all = require('./all');
const single = require('./single');
const add = require('./add');

lectures.get('/', all);
lectures.get('/:lectureId', single);
lectures.post('/',add);

module.exports = lectures;

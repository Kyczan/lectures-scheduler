const prepared = require('express').Router({ mergeParams: true });

const all = require('./methods/all');
const one = require('./methods/one');
const add = require('./methods/add');
const del = require('./methods/del');

prepared.get('/', all);
prepared.get('/:lectureId', one);
prepared.post('/', add);
prepared.delete('/:lectureId', del);

module.exports = prepared;

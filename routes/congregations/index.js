const congregations = require('express').Router();

const findObject = require('../findObject');
const sql = require('./sql');
const all = require('./methods/all');
const one = require('./methods/one');
const add = require('./methods/add');
const del = require('./methods/del');
const upd = require('./methods/upd');

congregations.param('congregationId', findObject(sql));

congregations.get('/', all);
congregations.get('/:congregationId', one);
congregations.post('/', add);
congregations.delete('/:congregationId', del);
congregations.put('/:congregationId', upd);

module.exports = congregations;

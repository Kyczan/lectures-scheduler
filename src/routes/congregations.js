const congregations = require('express').Router();

const findObject = require('./findObject');
const sql = require('../controllers/sql');
const congregationsController = require('../controllers/congregationsController');

congregations.param('congregationId', findObject(sql));

congregations.get('/', congregationsController.findAll);
congregations.get('/:congregationId', congregationsController.findOne);
congregations.post('/', congregationsController.create);
congregations.delete('/:congregationId', congregationsController.remove);
congregations.put('/:congregationId', congregationsController.update);

module.exports = congregations;

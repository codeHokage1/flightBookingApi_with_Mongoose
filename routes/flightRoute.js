const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router
    .get('/', controller.getAllFlights)
    .get('/:id', controller.getSingleFlight)
    .post('/', controller.bookFlight)
    .put('/:id', controller.updateFlight)
    .delete('/:id', controller.deleteFlight)

module.exports = router;


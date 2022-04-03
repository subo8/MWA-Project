/**
 * Water me
 * consumptionRoutes.js
 */

"use strict";
const express = require('express');
const router = express.Router();
const { create, getAll, getOne, update, deleteOne } = require('../controller/consumption.controller');

router
    .route('/:userID/consumption')
    .get(getAll)
    .post(create);

router
    .route('/:userID/consumption/:consumptionID')
    .get(getOne)
    .put(update)
    .delete(deleteOne);


module.exports = router;
/**
 * Water me
 * consumptionRoutes.js
 */

"use strict";
const express = require('express');
const router = express.Router();
const { create, getAll, getOne, fullUpdate, partialUpdate, deleteOne } = require('../controller/consumption.controller');

router
    .route('/:userID/consumption')
    .get(getAll)
    .post(create);

router
    .route('/:userID/consumption/:consumptionID')
    .get(getOne)
    .put(fullUpdate)
    .patch(partialUpdate)
    .delete(deleteOne);


module.exports = router;
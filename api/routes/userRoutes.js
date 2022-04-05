/**
 * Water me
 * userRoutes.js
 */

"use strict";

const express = require('express');
const router = express.Router();
const { create, getAll, getOne, fullUpdate, partialUpdate, deleteOne } = require('../controller/user.controller');

router
    .route("/")
    .get(getAll)
    .post(create);

router
    .route("/:userID")
    .get(getOne)
    .put(fullUpdate)
    .patch(partialUpdate)
    .delete(deleteOne);

module.exports = router;
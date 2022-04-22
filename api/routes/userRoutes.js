/**
 * Water me
 * userRoutes.js
 */

"use strict";

const express = require('express');
const router = express.Router();
const { create, getAll, getOne, fullUpdate, partialUpdate, deleteOne } = require('../controller/user.controller');
const { regUser, login } = require('../controller/credential.controller');
const auth = require('../controller/auth.controller')

router
    .route("/")
    .get(getAll)
    .post(auth.authenticate, create);

router
    .route("/:userID")
    .get(getOne)
    .put(fullUpdate)
    .patch(partialUpdate)
    .delete(deleteOne);

router
    .route('/register')
    .post(regUser);

router
    .route('/login')
    .post(login);


module.exports = router;
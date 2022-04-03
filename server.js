/**
 * Water me
 * server.js
 */

"use strict";

console.log("Water-Me app is running");

const dotenv = require('dotenv').config();
require('./api/data/db.js');

const express = require('express');
const PORT = process.env.PORT;
const PORT_MSG = process.env.LISTEN_PORT_MSG;
const userRoutes = require('./api/routes/userRoutes');
const consumptionRoutes = require('./api/routes/consumptionRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.status(process.env.RESP200).json({ message: 'This is home page!' });
});

app.use('/api/users', userRoutes, consumptionRoutes);

const server = app.listen(PORT, function () {
    console.log(PORT_MSG, server.address().port);
});
/**
 * Water me
 * users-model.js
 */
const mongoose = require('mongoose');

const consumptionSchema = new mongoose.Schema({
    size: {
        type: String,
        required: [false, 'Please select a size'],
        enum: ['100', '200', '300', '400', '500', '600', '700', '800']
    },
},
    {
        timestamps: true,
    });
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please add a name'],
    },
    gender: {
        type: String,
        require: [true, 'Please select a gender'],
        enum: ['Male', 'Female'],
    },
    age: {
        type: Number,
        require: [true, 'Please add a age']
    },
    weigth: {
        type: Number,
        require: [true, 'Please add a weight']
    },
    consumption: [consumptionSchema]
});

mongoose.model(process.env.WATER_MODEL, userSchema, process.env.WATER_COLLECTION);
const mongoose = require('mongoose');

const credentialSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    username: {
        type: String,
        required: [true, 'Please add a user name'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    }
}, {
    timestamps: true,
});

mongoose.model(process.env.CREDENTIAL_MODEL, credentialSchema, process.env.CREDENTIAL_COLLECTION);
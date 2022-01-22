const mongoose = require('mongoose');

const User = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    manufacturing_date: {
        type: Date,
        required: true
    },
    expiration_date: {
        type: Date,
        required: true
    }
}, { 
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('User', User);
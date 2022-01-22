const mongoose = require('mongoose');

const User = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { 
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('User', User);
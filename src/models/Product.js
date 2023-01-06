const mongoose = require('mongoose');

const Product = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    }
}, { 
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Product', Product);
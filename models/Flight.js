const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    dateBooked: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Flight', flightSchema)
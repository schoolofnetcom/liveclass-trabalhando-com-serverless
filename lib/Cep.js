const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    zipcode: String,
    state: String,
    city: String,
    neighborhood: String,
    comp: String
});

module.exports = mongoose.model('Cep', Schema);
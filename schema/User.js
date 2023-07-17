const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String || Number, require: true},
},{timestamps: true})

const model = mongoose.model('registersUsers', userSchema);
module.exports = model;
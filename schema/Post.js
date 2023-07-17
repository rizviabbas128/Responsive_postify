const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption: {type: String},
    image_file: {type:String},
    date: {
		type: Date,
		default: Date.now,
  }	
},{timestamps:true})

const model = mongoose.model('posts', postSchema);
module.exports = model;
var mongoose = require('../db/mongoose');

var Schema = mongoose.Schema;

var alertSchema = new Schema({
	name : String, 
	type : String, 
	additionalInfo : String
});

module.exports = alertSchema;

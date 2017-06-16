"use strict"; 

var mongoose = require("mongoose"); 

var booksSchema = mongoose.Schema({
	title: String, 
	description: String, 
	images: String, 
	price: Number
}); 

var Books = mongoose.model("books", booksSchema);
module.exports = Books; 
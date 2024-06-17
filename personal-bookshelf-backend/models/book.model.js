// models/book.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  edition_count: { type: Number, required: true },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

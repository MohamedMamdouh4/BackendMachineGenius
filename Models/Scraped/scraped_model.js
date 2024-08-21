const { text } = require("body-parser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scrapedSchema = new Schema({
  title:
  {
    type: String,
    unique: false,
    required: true, 
  },
  content: 
  {
    type: String,
    required: false 
  },
  date: 
  {
    type: String, 
    required: false
  },
  brand:
  {
    type: String,
    required: true
  },
  stock:
  {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Scraped', scrapedSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
let ticketSchema = new Schema({
  price: {
    type: Number
  },
  room: {
    type: String
  },
  sDate: {
    type: Date
  },
  eDate: {
    type: Date
  }
},)
  
const Tickets = mongoose.model('Tickets', ticketSchema);

module.exports = Tickets;

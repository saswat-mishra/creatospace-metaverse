const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
let creatorSchema = new Schema({
  cname: {
    type: String
  },
  cmail: {
    type: String
  },
  isCreator: {
    type: Boolean
  },
  subscriber: {
    type: Number
  },
  roomsOwned: {
    type: Number
  }
},)
  
const Creator = mongoose.model('Creators', creatorSchema);

module.exports = Creator;

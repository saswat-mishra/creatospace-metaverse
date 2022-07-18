const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
let creatorSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  isCreator: {
    type: Boolean
  },
  subscriber: {
    type: Number
  },
  Likes: {
    type: Number
  },
  roomsOwned: {
    type: Number
  }
},)
  
const Creator = mongoose.model('Creators', creatorSchema);

module.exports = Creator;

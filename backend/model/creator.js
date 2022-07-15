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
  }
},)
  
const Creator = mongoose.model('Creators', creatorSchema);

module.exports = Creator;

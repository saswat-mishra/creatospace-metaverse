const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema( {
	email: {
		type: String,
		unique: true
	},
	phone: {
		type: String
	},
	password:{
        type: String
    },
	bio: {
		type: String
	},
	roomsOwned: {type: [Schema.ObjectId], default: []},
	roomsJoined: {type: [Schema.ObjectId], default: []}
},{
    timestamps: true
});
const user = mongoose.model('user', userSchema);

module.exports = user;
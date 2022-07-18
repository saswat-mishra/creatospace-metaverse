const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema( {
	email: {
		type: String,
		unique: true
	},
	fname: {
		type: String
	},
	lname: {
		type: String
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
	isCreator:{
		type: Boolean,
		default: false
	},
	creatorSubs: {
		type: Number,
		default: 0
	},
	tickets: {
		type: Number,
		default: 0
	},
	AuthType:{
		type: String
	},
	roomsOwned: {type: [Schema.ObjectId], default: []},
	roomsJoined: {type: [Schema.ObjectId], default: []}
},{
    timestamps: true
});
const user = mongoose.model('user', userSchema);

module.exports = user;

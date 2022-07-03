var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	username: String,
	password: String,
	bio: String,
	roomsOwned: {type: [Schema.ObjectId], default: []},
	roomsJoined: {type: [Schema.ObjectId], default: []}
}),
user = mongoose.model('user', userSchema);

module.exports = user;
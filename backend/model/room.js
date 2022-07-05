var mongoose = require('mongoose');
var Schema = mongoose.Schema;

roomSchema = new Schema( {
	name: String,
	desc: String,
	price: String,
	hms_id: String,
	user_id: Schema.ObjectId,
	is_delete: { type: Boolean, default: false },
	joinees: {type: [Schema.ObjectId], default:  []},
	date : { type : Date, default: Date.now }
}),
room = mongoose.model('room', roomSchema);

module.exports = room;
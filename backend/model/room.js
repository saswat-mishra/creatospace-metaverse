var mongoose = require('mongoose');
var Schema = mongoose.Schema;

roomSchema = new Schema( {
	name: String,
	desc: String,
	price: Number,
	hms_id: String,
	image: String,
	isEvent: Boolean,
	user_id: Schema.ObjectId,
	is_delete: { type: Boolean, default: false },
	room_type: String,
	joinees: {type: [Schema.ObjectId], default:  []},
	//"Workshop Room","Video Room", "Hangout Space", "Discussion Night": Room_types
	date : { type : Date, default: Date.now }
}),
room = mongoose.model('room', roomSchema);

module.exports = room;
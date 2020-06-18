const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaObject = {
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	imagePath: {
		type: String,
		required: true,
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'Poster',
		required: true,
	},
};
const schemaOptions = {
	timestamps: true,
};

const postSchema = new Schema(schemaObject, schemaOptions);
module.exports = mongoose.model('Post', postSchema);
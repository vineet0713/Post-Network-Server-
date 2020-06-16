const mongoose = require('mongoose');

const schemaObject = {
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
};
const schemaOptions = {
	timestamps: true,
};

const postSchema = mongoose.Schema(schemaObject, schemaOptions);
module.exports = mongoose.model('Post', postSchema);
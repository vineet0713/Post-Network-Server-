if (process.env.NODE_ENV !== 'production') {
	// Sets the environment variables
	require('dotenv').config({ path: './myvariables.env' });
}
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

const postsRoutes = require('./routes/posts');

// This makes it possible to parse JSON data from incoming requests!
// (will extract incoming request data and assign it to a 'body' field to the request object in middleware)
app.use(bodyParser.json());

app.use((request, response, next) => {
	// This allows ANY client to make a request to this server!
	response.setHeader('Access-Control-Allow-Origin', '*');
	
	// This allows clients to use the following HTTP methods:
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	
	// This allows clients to set the following headers to their requests:
	response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	
	next();
});

const MIME_TYPE_MAP = {
	'image/png': 'png',
	'image/jpeg': 'jpeg',
	'image/jpg': 'jpg',
};
const fileStorage = multer.diskStorage({
	destination: (request, file, callback) => callback(null, 'images'),
	filename: (request, file, callback) => {
		const name = file.originalname.toLowerCase().split(' ').join('-');
		const extension = MIME_TYPE_MAP[file.mimetype];
		const uniqueFilename = name + '-' + Date.now() + '.' + extension;
		callback(null, uniqueFilename);
	},
});

const multerConfig = multer({ storage: fileStorage });
app.use(multerConfig.single('image'));

const absolutePathToImagesDirectory = path.join(__dirname, 'images');
app.use('/images', express.static(absolutePathToImagesDirectory));

app.use('/api', postsRoutes);

app.use((error, request, response, next) => {
	console.log(error);
	const httpStatusCode = error.statusCode || 500;
	response.status(httpStatusCode).json({ message: error.message, data: error.data });
});

mongoose.connect(process.env.MONGODBCONNECTIONURL)
	.then(result => app.listen(process.env.PORT))
	.catch(error => console.log(error));
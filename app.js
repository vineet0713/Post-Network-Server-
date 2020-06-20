if (process.env.NODE_ENV !== 'production') {
	// Sets the environment variables
	require('dotenv').config({ path: './myvariables.env' });
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const imagesRoutes = require('./routes/images');

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

app.use('/api', postsRoutes);
app.use('/api', authRoutes);
app.use('/api', imagesRoutes);

app.use((error, request, response, next) => {
	console.log('Inside error handling middlware!');
	console.log(error);
	const httpStatusCode = error.statusCode || 500;
	response.status(httpStatusCode).json({ message: error.message, data: error.data });
});

mongoose.connect(process.env.MONGODBCONNECTIONURL)
	.then(result => app.listen(process.env.PORT))
	.catch(error => console.log(error));
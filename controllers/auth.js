const Poster = require('./../models/poster');

const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

exports.signup = (request, response, next) => {
	bcrypt.hash(request.body.password, 10)
		.then(hashedPassword => {
			const poster = new Poster({
				username: request.body.username,
				password: hashedPassword,
			});
			return poster.save();
		})
		.then(result => {
			response.status(201).json({
				message: 'Sucessfully created new user.',
			});
		})
		.catch(error => next(error));
};

exports.login = (request, response, next) => {
	let loadedUser;
	Poster.findOne({ username: request.body.username })
		.then(user => {
			if (!user) {
				throw new Error('Could not find user with specified username');
			}
			loadedUser = user;
			return bcrypt.compare(request.body.password, user.password);
		})
		.then(passwordMatches => {
			if (!passwordMatches) {
				throw new Error('Invalid password');
			}
			const payload = {
				id: loadedUser._id,
				email: loadedUser.email,
				password: loadedUser.password,
			};
			const expiration = { expiresIn: '1h' };
			// Creates a new token for authenticated users to be stored on the client
			const token = jsonwebtoken.sign(payload, process.env.SECRET_KEY, expiration);
			response.status(200).json({
				token: token,
				expiresIn: 3600,	// duration (in seconds) until the token expires
			});
		})
		.catch(error => next(error));
};
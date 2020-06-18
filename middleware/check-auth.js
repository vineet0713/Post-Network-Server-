const jsonwebtoken = require('jsonwebtoken');

module.exports = (request, response, next) => {
	try {
		const headersAuthValue = request.headers.authorization;
		// 'headersAuthValue' would be something like 'Bearer asdfjoalsfkdj'
		const token = headersAuthValue.split(' ')[1];
		// 'decodedToken' will have the same values of the 'payload' JS object that was used to generate the token!
		const decodedToken = jsonwebtoken.verify(token, process.env.SECRET_KEY);
		request.userData = {
			userId: decodedToken.userId,
			username: decodedToken.username,
		};
		next();
	} catch (error) {
		let authorizationError = new Error('Not authorized!');
		authorizationError.statusCode = 401;
		next(authorizationError);
	}
};
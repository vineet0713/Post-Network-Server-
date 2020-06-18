const jsonwebtoken = require('jsonwebtoken');

module.exports = (request, response, next) => {
	try {
		const headersAuthValue = request.headers.authorization;
		// 'headersAuthValue' would be something like 'Bearer asdfjoalsfkdj'
		const token = headersAuthValue.split(' ')[1];
		jsonwebtoken.verify(token, process.env.SECRET_KEY);
		next();
	} catch (error) {
		let authorizationError = new Error('Not authorized!');
		authorizationError.statusCode = 401;
		next(authorizationError);
	}
};
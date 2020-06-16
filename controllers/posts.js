exports.getPosts = (request, response, next) => {
	const posts = [
		{
			id: 'dummyid1',
			title: 'Dummy Title 1',
			content: 'Dummy Content 1',
		},
		{
			id: 'dummyid2',
			title: 'Dummy Title 2',
			content: 'Dummy Content 2',
		},
	];
	response.status(200).json({
		message: 'success!',
		posts: posts,
	});
};

exports.storePost = (request, response, next) => {
	console.log(request.body);
	response.status(201).json({
		message: 'success!',
	});
};
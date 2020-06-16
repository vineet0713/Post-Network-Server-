const Post = require('./../models/post');

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
	Post.find()
		.then(fetchedPosts => {
			response.status(200).json({
				message: 'success!',
				posts: fetchedPosts,
			});
		})
		.catch(error => next(error));
};

exports.storePost = (request, response, next) => {
	const postToStore = new Post({
		title: request.body.title,
		content: request.body.content,
	});
	postToStore.save()
		.then(savedPost => {
			response.status(201).json({
				message: 'success!',
				postId: savedPost._id,
			});
		})
		.catch(error => next(error));
};

exports.deletePost = (request, response, next) => {
	const idOfPostToDelete = request.params.postid;
	Post.deleteOne({ _id: idOfPostToDelete })
		.then(result => {
			console.log(result);
			response.status(200).json({
				message: 'success!',
			});
		})
		.catch(error => next(error));
};
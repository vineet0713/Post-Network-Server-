const Post = require('./../models/post');

exports.getPosts = (request, response, next) => {
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
			response.status(200).json({
				message: 'success!',
			});
		})
		.catch(error => next(error));
};

exports.updatePost = (request, response, next) => {
	const idOfPostToUpdate = request.params.postid;
	const updatedPost = new Post({
		_id: idOfPostToUpdate,
		title: request.body.title,
		content: request.body.content,
	});
	Post.updateOne({ _id: idOfPostToUpdate }, updatedPost)
		.then(result => {
			response.status(200).json({
				message: 'success!',
			});
		})
		.catch(error => next(error));
};

exports.getPost = (request, response, next) => {
	const idOfPostToGet = request.params.postid;
	Post.findById(idOfPostToGet)
		.then(fetchedPost => {
			response.status(200).json({
				message: 'success!',
				post: fetchedPost,
			});
		})
		.catch(error => next(error));
};
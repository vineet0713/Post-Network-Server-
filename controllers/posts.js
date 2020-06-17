const fs = require('fs');
const path = require('path');

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
		imagePath: constructImagePath(request.protocol, request.get('host'), request.file.filename),
	});
	postToStore.save()
		.then(savedPost => {
			response.status(201).json({
				message: 'success!',
				postId: savedPost._id,
				imagePath: savedPost.imagePath,
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
		imagePath: (request.file)
					// If the request has a file, we have to construct its new image path
					? constructImagePath(request.protocol, request.get('host'), request.file.filename)
					// If the request doesn't have a file, it means the image wasn't updated (so we can use the old image path)
					: request.body.imagePath,
	});
	if (request.file) {
		// If the request has a file, we have to delete the previously uploaded file for this post!
		clearImage(request.body.imagePath);
	}
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

function constructImagePath(protocol, host, filename) {
	const url = protocol + '://' + host;
	return url + '/images/' + filename;
}

function clearImage(imagePath) {
	const filePath = path.join(__dirname, '..', imagePath.slice(imagePath.indexOf('images')));
	fs.unlink(filePath, error => console.log(error));
}
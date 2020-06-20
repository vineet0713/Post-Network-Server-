const express = require('express');
const router = express.Router();

const Multer = require('multer');
const googlecloudStorage = require('@google-cloud/storage');

const storage = new googlecloudStorage.Storage();
const multer = Multer({
	storage: Multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
	},
});
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
const MIME_TYPE_MAP = {
	'image/png': 'png',
	'image/jpeg': 'jpeg',
	'image/jpg': 'jpg',
};

router.post('/uploadimage', multer.single('file'), (request, response, next) => {
	if (!request.file) {
		const error = new Error('No file uploaded.');
		error.statusCode = 400;
		next(error);
	}

	const name = request.file.originalname.toLowerCase().split(' ').join('-');
	const extension = MIME_TYPE_MAP[request.file.mimetype];
	const uniqueFilename = name + '-' + Date.now() + '.' + extension;

	// Create a new blob in the bucket and upload the file data.
	const blob = bucket.file(uniqueFilename);
	const blobStream = blob.createWriteStream();

	blobStream.on('error', (error) => {
		next(error);
	});

	blobStream.on('finish', () => {
		// The public URL can be used to directly access the file via HTTP.
		const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
		response.status(200).json({ imagePath: publicUrl });
	});

	blobStream.end(request.file.buffer);
});

router.post('/deleteimage', (request, response, next) => {
	const imageFilenameArray = request.body.imagePath.split('/');
	const imageFilename = imageFilenameArray[imageFilenameArray.length - 1];
	bucket.file(imageFilename).delete()
		.then(result => response.json({ message: 'File deleted!' }))
		.catch(error => next(error));
});

module.exports = router;
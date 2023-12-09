// // Followed the gcp docs

// const { Storage } = require('@google-cloud/storage');
// const stream = require('stream');
// const storage = new Storage();

// const myBucket = storage.bucket('andria_user_book_images');
// const file = myBucket.file('testFile');

// // Create a pass through stream from a string
// const passthroughStream = new stream.PassThrough();
// passthroughStream.write(contents);
// passthroughStream.end();

// async function streamFileUpload() {
//   passthroughStream.pipe(file.createWriteStream()).on('finish', () => {
//     // The file upload is complete
//   });

//   console.log(`${destFileName} uploaded to ${bucketName}`);
// }

// streamFileUpload().catch(console.error);
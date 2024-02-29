const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

const upload_book_image = async (image_file) => {
    // Resource used: https://dev.to/kamalhossain/upload-file-to-google-cloud-storage-from-nodejs-server-5cdg

    const myBucket = storage.bucket('andria_user_book_images');
    const response = new Promise((resolve) => {
        myBucket.upload(
            image_file,
            {
                destinatin: 'andria_user_book_images/'
            },
            (err, file) => {
                if (err) {
                    console.error(`Error uploading: ${err}`);
                    resolve({ error: "Couldn't upload image" });
                } else {
                    // Make the file public
                    file.makePublic(async function (err) {
                        if (err) {
                            console.error(`Error uploading: ${err}`);
                            resolve({ error: "Couldn't make image public" });
                        } else {
                            const publicUrl = file.publicUrl();
                            const fileName = file.name;
                            resolve({ publicUrl, fileName });
                        }
                    })
                }
            })
    })
    return await response;
}

module.exports = { upload_book_image }
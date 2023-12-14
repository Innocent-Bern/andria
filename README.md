
# ANDRIA

Andria is a platform to discover and share books with people near you.

## Inspiration for the project
From time to time I like reading novels and if you own physical copies after you're done with them they'll mostly be left to collect dust on your book shelf. 

## Frontend
The frontend is built with Next Js. I chose it over just HTML, CSS and vanilla JavaScript because the application needed to be reactive.

## Backend
The backend is implemented using Node Js. I built a RESTful API to enable users interact with the Database

## Database solution
The DBMS used is MONGODB. I chose to work the the NOSQL solution because I the data models had arrays and there was no direct implementation in MySQL.

## Cloud storage solution
I used Google Cloud Platform to store the images uploaded by the users. The code snippet below was how I managed to upload images to GCP.

```
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    keyFilename: `./gcp_private_key.json`,
});

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
```

## Contributors


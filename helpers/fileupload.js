
const AWS = require('aws-sdk');

const mongoose = require('mongoose');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});


const s3 = new AWS.S3();


module.exports = {

  uploadToS3(filePath) {
    if (filePath !== 'none') {
      const id = new mongoose.mongo.ObjectId();
      const extension = filePath.name.split('.').pop();
      const s3params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Body: filePath.data,
        Key: `folder/${id}.${extension}`,
      };

      s3.upload(s3params, async (err, data) => {
        if (err) {
          console.log('Error', err);
        }
        console.log(data);
      });

      return `https://s3.amazonaws.com/username here/folder/${id}.${extension}`;
    }
    return 'no file';
  },

};

import dotenv from 'dotenv';
import fs from 'fs';
import { S3 } from 'aws-sdk';
dotenv.config();
const bucketName = process.env.AWS_BUCKET_NAME || '';
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region
});

export const uploadFile = async (file: Express.Multer.File) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file!.filename
  };

  try {
    const res = await s3.upload(uploadParams).promise();

    console.log('File Uploaded with Successfull', res.Location);

    return { success: true, message: 'File Uploaded with Successfull', data: res.Location };
  } catch (error) {
    return { success: false, message: 'Unable to Upload the file', data: '' };
  }
};

export const getFileStream = (fileKey: string) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  };

  return s3.getObject(downloadParams).createReadStream();
};

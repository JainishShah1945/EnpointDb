const sharp = require("sharp");
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
    endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`, 

  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const processImage = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const ext = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, ext);
    const timestamp = Date.now();

    const formats = [
      { format: "jpeg", quality: 80, contentType: "image/jpeg" },
      { format: "png", quality: 90, contentType: "image/png" },
      { format: "webp", quality: 80, contentType: "image/webp" },
    ];

    let uploadedFiles = [];

    for (const fmt of formats) {
      const processedBuffer = await sharp(file.buffer)
        .resize(500, 500, { fit: "cover" })
        .toFormat(fmt.format, { quality: fmt.quality })
        .toBuffer();

      const newFileName = `${timestamp}-${fileName}.${fmt.format}`;
      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `uploads/${newFileName}`,
        Body: processedBuffer,
        ContentType: fmt.contentType,
      };

      await s3.send(new PutObjectCommand(uploadParams));

      uploadedFiles.push({
        format: fmt.format,
        url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${newFileName}`,
      });
    }

    return res.status(200).json({
      message: "Image processed & uploaded successfully!",
      uploadedFiles,
    });
  } catch (error) {
    console.error("Error processing/uploading image:", error);
    return res.status(500).json({ message: "Image processing failed", error });
  }
};

module.exports =  processImage ;

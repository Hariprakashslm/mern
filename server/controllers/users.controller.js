const collection = require("../schema");
const { s3 } = require("../utils/s3Client");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

module.exports = {
  getUsers: async (req, res) => {
    const users = await collection.UserModel.find().exec();

    res.status(200).json({ data: users });
  },
  createUser: async (req, res) => {
    console.log("req.file => ", req.file);
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    console.log(
      "process.env.AWS_S3_BUCKET_NAME => ",
      process.env.AWS_S3_BUCKET_NAME
    );

    const fileId = `uploads/${req.file.originalname}`;
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileId,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    try {
      const command = new PutObjectCommand(uploadParams);
      await s3.send(command);
    } catch (error) {
      console.error("Upload Error:", error);
      res.status(500).json({ error: "Upload failed" });
    }
    const doc = await (
      await collection.UserModel.create({ ...req.body, fileId })
    ).save();

    res.status(200).json({ _id: doc._id, createdAt: doc.createdAt });
  },
};

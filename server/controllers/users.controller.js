const collection = require("../schema");

module.exports = {
  getUsers: async (req, res) => {
    const users = await collection.UserModel.find().exec();

    res.status(200).json({ data: users });
  },
  createUser: async (req, res) => {
    console.log(req.body);
    const doc = await (await collection.UserModel.create(req.body)).save();
    console.log({ doc });
    res.status(200).json({ _id: doc._id, createdAt: doc.createdAt });
  },
};

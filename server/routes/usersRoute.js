const usersController = require("../controllers/users.controller");
const { APIMethods } = require("../utils/apiMethods");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });
const fileUploadMiddleware = upload.single("file");
const userRoutes = [
  {
    path: "/",
    method: APIMethods.GET,
    middlewares: [
      // (req, res, next) => {
      //   console.log("first middleware");
      //   next();
      // },
      // (req, res, next) => {
      //   console.log("secound middleware");
      //   next();
      // },
    ],
    handler: usersController.getUsers,
  },
  {
    path: "/",
    method: APIMethods.POST,
    middlewares: [fileUploadMiddleware],
    handler: usersController.createUser,
  },
];

module.exports = userRoutes;

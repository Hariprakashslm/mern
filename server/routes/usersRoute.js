const usersController = require("../controllers/users.controller");
const { APIMethods } = require("../utils/apiMethods");

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
    handler: usersController.createUser,
  },
];

module.exports = userRoutes;

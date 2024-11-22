let userController = require("../controller/userController");
console.log("Module userController loaded");

var express = require("express");
var router = express.Router();

// All user routes
router
  .route("/")
  .get((req, res) => {
    userController.getAllUsers(req, res);
  })
  .post((req, res) => {
    userController.saveUser(req, res);
  });

// User by array index route
router.route("/:index").get((req, res) => {
  userController.getUserByIndex(req, res);
});

// User by email route
router.route("/email/:email").get((req, res) => {
  userController.getUserByEmail(req, res);
});

// Delete user by email route
router.route("/email/:email").delete((req, res) => {
  userController.deleteUser(req, res);
});

// Put route for updating a user
router.route("/:email").put(userController.updateUser);

// Patch route for updating a user's firstName by email
router.route("/:email/firstName").patch(userController.patchUserFirstName);

module.exports = router;

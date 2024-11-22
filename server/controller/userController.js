let user = require("../model/user");
let userService = require("../service/userService");
const sessionUtil = require('../utils/sessionUtil');

console.log("Module userController loaded");

let users = [];

// TEST USER DATA -------------------------------------------------
// let brian = user.createUser("Brian", "Gormanly", "bg@gmail.com");
// users.push(brian);
// let matt = user.createUser("Matt", "Levy", "ml@gmail.com");
// users.push(matt);
// let frank = user.createUser("Frank", "Sinatra", "fs@gmail.com");
// users.push(frank);
// let aaron = user.createUser("Aaron", "Mcgirr", "am@gmail.com");
// users.push(aaron);
// ----------------------------------------------------------------

// Send entire users array as the body of the response as json
exports.getAllUsers = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let users = await userService.getAllUsers()
  res.send(users);
};

// Retrieve the user in the :index parameter of the request and return as json
exports.getUserByIndex = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
      const user = await userService.getUserByIndex(req.params.index);
      res.send(user);
  } catch (error) {
      console.error('Error getting user by index:', error);
      res.status(500).json({ error: error.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  const userEmail = req.params.email;
  try {
      const user = await userService.getUserByEmail(userEmail);
      res.setHeader("Content-Type", "application/json");
      if (user) {
          res.send(user);
      } else {
          res.status(404).send({ error: "User not found" });
      }
  } catch (error) {
      console.error('Error getting user by email:', error);
      res.status(500).json({ error: error.message });
  }
};


// Save a user
exports.saveUser = async (req, res) => {
  try {
      if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
          return res.status(400).json({ error: "Missing required fields" });
      }

      // Await the creation of the user
      let newUser = await user.createUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
      const savedUser = await userService.saveUser(newUser);
      res.status(201).json(savedUser);
  } catch (error) {
      console.error('Error in saveUser:', error);
      res.status(500).json({ error: error.message });
  }
};


// Delete a user by email, if not found, send 404
exports.deleteUser = async (req, res) => {
  const userEmail = req.params.email;
  try {
      const result = await userService.deleteUserByEmail(userEmail);
      if (result) {
          res.status(200).send({ message: "User deleted successfully" });
      } else {
          res.status(404).send({ error: "User not found" });
      }
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const userEmail = req.params.email;
  try {
      const updatedUser = await userService.updateUserByEmail(userEmail, req.body);
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(updatedUser);
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: error.message });
  }
};


exports.patchUserFirstName = async (req, res) => {
  const userEmail = req.params.email;
  try {
      const updatedUser = await userService.updateUserFirstNameByEmail(userEmail, req.body.firstName);
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(updatedUser);
  } catch (error) {
      console.error('Error patching user first name:', error);
      res.status(500).json({ error: error.message });
  }
};


// Login handler
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
      const user = await userService.authenticateUser(email, password);
      console.log("authenticated user");
      if (user) {
          console.log("1");
          sessionUtil.initSession(req, user);
          res.redirect('/home');
      } else {
          res.status(401).send('Login failed');
      }
  } catch (error) {
      res.status(500).send('Server error');
  }
};

// Logout handler
exports.logout = async (req, res) => {
  try {
      await sessionUtil.destroySession(req);
      res.redirect('/');
  } catch (error) {
      res.status(500).send('Failed to log out');
  }
};
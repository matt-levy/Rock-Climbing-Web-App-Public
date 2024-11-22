console.log("User module loaded");

const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');

class User {
  constructor(userId, firstName, lastName, email, password) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}

exports.createUser = async function(firstName, lastName, email, password) {
  const userId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  return new User(userId, firstName, lastName, email, hashedPassword);
};


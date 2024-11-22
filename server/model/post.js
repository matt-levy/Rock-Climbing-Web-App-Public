console.log("Module post loaded");

const { v4: uuidv4 } = require("uuid");

class Post {
  constructor(id, userId, title, climbName, grade, body) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.climbName = climbName;
    this.grade = grade;
    this.body = body;
  }
}

exports.createPost = function (title, climbName, grade, body) {
  const id = uuidv4(); // Generate a new UUID for each post
  const userId = uuidv4(); // placeholder until sessions work
  return new Post(id, userId, title, climbName, grade, body);
};

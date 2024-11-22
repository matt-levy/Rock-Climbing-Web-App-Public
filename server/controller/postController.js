let post = require("../model/post");
let postService = require("../service/postService");
const { v4: uuidv4 } = require("uuid");

console.log("Module postController loaded");

let posts = [];

// let post1 = post.createPost("Title1", "Name1", "Grade1", "Body1");
// posts.push(post1);
// let post2 = post.createPost("Title2", "Name2", "Grade2", "Body2");
// posts.push(post2);

// Send entire posts array as the body of the response as json
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.setHeader("Content-Type", "application/json");
    res.send(posts);
  } catch (error) {
    console.error("Error getting posts:", error);
    res.status(500).json({ message: "Failed to retrieve posts." });
  }
};

// Get filtered array of posts by grade
exports.getPostsByGrade = async (req, res) => {
  const grade = req.params.grade;
  try {
    const filteredPosts = await postService.getPostsByGrade(grade);
    if (filteredPosts.length > 0) {
      res.setHeader("Content-Type", "application/json");
      res.send(filteredPosts);
    } else {
      res
        .status(404)
        .json({ message: "No posts found matching the specified grade." });
    }
  } catch (error) {
    console.error("Error filtering posts by grade:", error);
    res.status(500).json({ message: "Failed to filter posts." });
  }
};

// Save a post
exports.savePost = async (req, res) => {
  // if (!req.session || !req.session.user) {
  //   console.log("session user", req.session.user);
  //   console.log("Session data:", req.session);
  //   return res.status(401).json({ message: "Unauthorized access." });
  // }

  try {
    const postData = {
      id: uuidv4(),
      //userId: req.session.user.id
      title: req.body.title,
      climbName: req.body.climbName,
      grade: req.body.grade,
      body: req.body.body,
    };
    const savedPost = await postService.savePost(postData);
    res.setHeader("Content-Type", "application/json");
    res.status(201).send(savedPost);
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ message: "Failed to save the post." });
  }
};

// Delete a post by UUID, if not found, send 404
exports.deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const deletionResult = await postService.deletePost(postId);
    if (deletionResult) {
      res.status(200).json({ message: "Post successfully deleted" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update whole post (not id)
exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const updateData = {
    title: req.body.title,
    climbName: req.body.climbName,
    grade: req.body.grade,
    body: req.body.body,
  };

  try {
    const updatedPost = await postService.updatePost(postId, updateData);
    if (updatedPost) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(updatedPost);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update only the grade on a post (climbing grades change depending on who sends them)
exports.patchPostGrade = async (req, res) => {
  const postId = req.params.id;
  const newGrade = req.body.grade;

  try {
    const updatedPost = await postService.patchPostGrade(postId, newGrade);
    if (updatedPost) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(updatedPost);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error("Error patching post grade:", error);
    res.status(500).json({ error: error.message });
  }
};

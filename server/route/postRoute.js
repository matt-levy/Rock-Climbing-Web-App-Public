let postController = require("../controller/postController");
console.log("Module postRoute loaded");

var express = require("express");
var router = express.Router();

// All post routes
router
  .route("/")
  .get((req, res) => {
    postController.getAllPosts(req, res);
  })
  .post((req, res) => {
    
    postController.savePost(req, res);
  });

// Route for getting posts by grade
router.route("/grade/:grade").get(postController.getPostsByGrade);

// Route to delete a post by UUID
router.route("/:id").delete(postController.deletePost);

// PUT route for updating a post
router.route("/:id").put(postController.updatePost);

// PATCH route for updating a post's grade
router.route("/:id/grade").patch(postController.patchPostGrade);

module.exports = router;

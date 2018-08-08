const express = require('express');
const router = express.Router();


const PostController = require('../controllers/post');

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

//creates a post
router.post("", checkAuth, extractFile, PostController.createPost);

//updates post
router.put("/:id", checkAuth, extractFile, PostController.updatePost);

// gets all the posts
router.get('', PostController.getPosts);

//gets single post.
router.get("/:id", PostController.getPost);

//deletes a post
router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;

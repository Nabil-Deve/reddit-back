const express = require("express");
const { createComment } = require("../controllers/commentController");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/create/:postId", auth, createComment);

module.exports = router;

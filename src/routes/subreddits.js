const express = require("express");
const {
  createSubreddit,
  deleteSubreddit,
  getSubreddit,
  updateSubreddit,
} = require("../controllers/subredditController");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/create", auth, createSubreddit);
router.delete("/delete/:subredditId", auth, deleteSubreddit);
router.get("/get/:subredditId", auth, getSubreddit);
router.put("/update/:subredditId", auth, updateSubreddit);

module.exports = router;

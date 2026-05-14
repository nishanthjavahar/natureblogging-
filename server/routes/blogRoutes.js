const express = require("express");

const router = express.Router();

const {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const upload =
require("../middleware/upload");

// GET all blogs
router.get("/", getBlogs);

// CREATE blog
router.post(
  "/",
  upload.single("image"),
  createBlog
);

// GET single blog
router.get("/:id", async (req, res) => {

  try {

    const Blog =
      require("../models/Blog");

    const blog =
      await Blog.findById(
        req.params.id
      );

    res.json(blog);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

// UPDATE blog
router.put(
  "/:id",
  upload.single("image"),
  updateBlog
);

// DELETE blog
router.delete("/:id", deleteBlog);

module.exports = router;
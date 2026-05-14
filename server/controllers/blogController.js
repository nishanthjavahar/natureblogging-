const Blog = require("../models/Blog");

// GET BLOGS
const getBlogs = async (req, res) => {

  try {

    const blogs = await Blog.find();

    res.json(blogs);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

// CREATE BLOG
const createBlog = async (req, res) => {

  try {

    const blog = new Blog({

      title: req.body.title,

      content: req.body.content,

      category: req.body.category,

      image: req.file
        ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        : "",

    });

    const savedBlog =
      await blog.save();

    res.status(201).json(savedBlog);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

// UPDATE BLOG
const updateBlog = async (req, res) => {

  try {

    const updatedData = {

      title: req.body.title,

      content: req.body.content,

      category: req.body.category,

    };

    if (req.file) {

      updatedData.image =
        `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    }

    const updatedBlog =
      await Blog.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );

    res.json(updatedBlog);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

// DELETE BLOG
const deleteBlog = async (req, res) => {

  try {

    await Blog.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
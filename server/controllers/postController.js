// server/controllers/postController.js
import Post from "../models/Post.js";
import Category from "../models/Category.js";

// GET all posts
export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .populate("category", "name")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// GET single post
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name email")
      .populate("category", "name");
    if (!post) return res.status(404).json({ message: "Post not found" });

    await post.incrementViewCount();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// CREATE post (protected)
export const createPost = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const { title, content, category, tags, excerpt } = req.body;

    const catExists = await Category.findById(category);
    if (!catExists) return res.status(400).json({ message: "Invalid category" });

    const post = await Post.create({
      title,
      content,
      category,
      tags,
      excerpt,
      author: req.user._id,
    });
    await post.save(); 
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

// UPDATE post (protected)
export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Only author or admin can edit
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE post (protected)
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// ADD comment (protected)
export const addComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    await post.addComment(req.user._id, content);
    res.status(201).json({ message: "Comment added" });
  } catch (err) {
    next(err);
  }
};

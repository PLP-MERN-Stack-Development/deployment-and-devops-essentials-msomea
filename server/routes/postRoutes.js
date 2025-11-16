// server/routes/postRoutes.js
import express from "express";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment,
} from "../controllers/postController.js";
import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", requireAuth, createPost);
router.put("/:id", requireAuth, updatePost);
router.delete("/:id", requireAuth, deletePost);
router.post("/:id/comments", requireAuth, addComment);

export default router;

import { Router } from "express";
import { createPost, getPost, updatePost, deletePost } from "../controllers/post.controller.js";

const router = Router();

router.route("/createpost").post(createPost);
router.route("/getpost").get(getPost);
router.route("/updatepost/:id").patch(updatePost);
router.route("/deletepost/:id").delete(deletePost);

export default router;
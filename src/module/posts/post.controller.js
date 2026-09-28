import { Router } from "express";
import { createPost, getPosts, getPostsAuthor } from "./post.service.js";
const router = Router()
// start posts apis 
// get posts only
router.get("/get-all-posts", async (req, res) => {
    let data = await getPosts()
    res.json(data)
})
// add new post
router.post("/create-post", async (req, res) => {
    let data = await createPost(req.body)
    res.json(data)
})
// get posts with author 
router.get("/get-all-posts-author", async (req, res) => {
    let data = await getPostsAuthor()
    res.json(data)
})

export default router
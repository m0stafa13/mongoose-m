import { Router } from "express";
import { createPost, deletePost, getPostById, getPosts, getPostsAuthor, updatePost } from "./post.service.js";
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
// update post by id 
router.put("/update-post/:id", async (req, res) => {
    let data = await updatePost(req.params, req.body)
    res.json(data)
})
//delete post by id 
router.delete("/delete-post/:id", async (req, res) => {
    let data = await deletePost(req.params)
    res.json(data)
})
// find post by id 
router.get("/find-post-by/:id", async (req, res) => {
    let { id } = req.params
    let data = await getPostById(id)
    res.json(data)  
})




export default router
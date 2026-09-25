import { Router } from "express";
import { createUser, getAllUsers } from "./user.service.js";
let router = Router()
// start user api 

// get all users 
router.get("/get-all-users", async (req, res) => {
    let data = await getAllUsers()
    res.json(data)
})

// sign up
router.post("/create-user", async (req, res) => {
    let data = await createUser(req.body)
    res.json(data)
})



export default router
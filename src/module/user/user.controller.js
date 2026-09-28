import { Router } from "express";
import { createUser, getAllUsers, getUserById, updateUser, updateUserSave } from "./user.service.js";
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
// find user by id 
router.get("/find-user-id/:id", async (req, res) => {
    let data = await getUserById(req.params)
    res.json(data)
})
// update user 
// findByIdAndUpdate ==> return data before and after edit  {new : true} ||{returnDocument: "after"}
router.put("/update-user/:id", async (req, res) => {
    let { id } = req.params
    let data = await updateUser(id, req.body)
    res.json(data)
})
// update user using save fund and update  __v 
// __v return  data after increment 
router.put("/update-user-save/:id", async (req, res) => {
    let { id } = req.params
    let data = await updateUserSave(id, req.body)
    res.json(data)
})



export default router
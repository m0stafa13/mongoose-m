import { postModel } from "../../db/model/post.model.js"
import { userModel } from "../../db/model/user.model.js"
// get all posts only
export const getPosts = async () => {
    let getPost = await postModel.find()
    if (getPost.length > 0) {
        return {
            message: "posts added successfully",
            posts: getPost
        }
    } else {
        return {
            message: "no posts found"
        }
    }
}
// add new post 
export const createPost = async (body) => {
    let { authorId } = body
    try {
        let checkUser = await userModel.findOne({ _id: authorId })
        if (!checkUser) {
            return {
                message: "author id is not found"
            }
        }
        let post = await postModel.insertOne(body)
        if (post) {
            return {
                message: "post added successfully",
                post
            }
        } else {
            return {
                message: "something went wrong"
            }
        }
    } catch (error) {
        return {
            message: "all data require in correct way"
        }
    }
}
// get posts with users 
export const getPostsAuthor = async () => {
    let allPosts = await postModel.find().populate("authorId")
    if (allPosts.length > 0) {
        return {
            message: "posts founded successfully",
            posts: allPosts
        }
    } else {
        return {
            message: "no posts founded"
        }
    }
}
// populate(authorId)
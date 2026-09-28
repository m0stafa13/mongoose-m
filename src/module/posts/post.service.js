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

// update post by id
export const updatePost = async (iD, data) => {
    let { id } = iD
    let { title, content } = data
    console.log(id);
    try {
        let update = await postModel.findOneAndUpdate({ _id: id }, { title, content }, { returnDocument: "after" }).select("-_id -__v -authorId")
        if (update) {
            return {
                message: "user updated successfully ",
                updatedPost: update
            }
        } else {
            return {
                message: "something went wrong"
            }
        }
    } catch (error) {
        return {
            message: "post id is not correct"
        }
    }
}
// delete post by id 
export const deletePost = async ({ id }) => {
    try {
        let del = await postModel.findOneAndDelete({ _id: id })
        if (del) {
            return {
                message: "post deleted successfully"
            }
        } else {
            return {
                message: "post not found"
            }
        }
    } catch (error) {
        return {
            message: "invalid input"
        }
    }
}

// get post by id 

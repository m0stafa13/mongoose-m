import mongoose, { Types } from "mongoose";

let postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: false
    },
    content: {
        required: true,
        type: String,

    },
    authorId: {
        type: Types.ObjectId,
        required: true,
        ref: "user"
    }
}, {
    collection: "user",
    //collection: "post"//  change collection name (will create new collection )
    //strict: false //  we can add new key and value

    timestamps: true,

})
export const postModel = mongoose.model("posts", postSchema)

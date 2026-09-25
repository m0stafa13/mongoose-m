import mongoose, { Schema } from "mongoose";
//user schema 
const userSchema = new Schema({
    f_name: {
        type: String,
        required: true,
        trim: true
    },
    l_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true // will remove space 
    },
    age: Number,
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        default: "male"
    },
    password: {
        type: String,
        select: false, // when get data from database will not return password 
        required: true,
        minlength: 5,
        trim: true
    }
},

    {
        toJSON: { virtuals: true, },
        toObject: { virtuals: true, },
        timestamps: true,
        strict: true,
        strictQuery: true
    })
userSchema.virtual("fullName").get(function () {
    return `${this.f_name} ${this.l_name}`
})
export const userModel = mongoose.model("user", userSchema)
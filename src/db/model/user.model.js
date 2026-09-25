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
        timestamps: true,
        strict: true,
        strictQuery: true
    })
userSchema.virtual(fullName).set(function (value) {
    if (value) {
        const [f_name, l_name] = value.split(" ")
        this.f_name = f_name
        this.l_name = l_name
    }
}).get(function () {
    return `${this.f_name} ${l_name}`
})
export const userModel = mongoose.model("user", userSchema)
import { userModel } from "../../db/model/user.model.js"
// add new user in db
export const createUser = async (body) => {
    let { f_name, email, l_name, password, gender, phone, age } = body
    try {
        let existedUser = await userModel.findOne({ email, phone })
        if (existedUser) {
            return {
                message: "user already exists"
            }
        } else {
            let addUser = await userModel.insertOne({ f_name, l_name, email, password, gender, phone, age })
            if (addUser) {
                return {
                    message: "user added successfully ",
                    userData: addUser
                }
            }
        }
    } catch (error) {
        return {
            message: "all data req in true way "
        }
    }
}
// get all users 
export const getAllUsers = async () => {
    let users = await userModel.find().select("-f_name  -l_name")
    try {
        if (users.length > 0) {
            return users
        } else {
            return {
                message: "no users found"
            }
        }
    } catch (error) {
        return {
            message: "something went wrong"
        }
    }
}
// get user by id 
export const getUserById = async (data) => {
    let { id } = data
    let findUser = await userModel.findById(id).select("-password -f_name -l_name")
    if (findUser) {
        return {
            message: "user founded successfully",
            user: findUser
        }
    } else {
        return {
            message: "user not found"
        }
    }
}
// update user data 
export const updateUser = async (id, userData) => {
    let { f_name, l_name, password, email, phone, age, gender } = userData
    let data = {}
    f_name ? data.f_name = f_name : null
    l_name ? data.l_name = l_name : null
    password ? data.password = password : null
    phone ? data.phone = phone : null
    email ? data.email = email : null
    age ? data.age = age : null
    gender ? data.gender = gender : null
    let findUser = await userModel.findById(id)
    if (findUser) {
        const updatedData = await userModel.findByIdAndUpdate(id, data, { returnDocument: "after" })
        if (updatedData) {
            return {
                message: "user updated successfully",
                user: updatedData
            }
        } else {
            return {
                message: "something went wrong"
            }
        }
    }
}
// update with save method
export const updateUserSave = async (id, userData) => {
    let { f_name, l_name, password, email, phone, age, gender } = userData
    try {
        let user = await userModel.findById(id)
        if (!user) {
            return {
                message: "user id not found"
            }
        }
        f_name ? user.f_name = f_name : null
        l_name ? user.l_name = l_name : null
        password ? user.password = password : null
        email ? user.email = email : null
        phone ? user.phone = phone : null
        age ? user.age = age : null
        gender ? user.gender = gender : null
        user.__v = user.__v + 1
        const updatedData = await user.save()
        console.log(updatedData);
        return updatedData
    } catch (error) {
        return {
            message: "id or data is not correct"
        }
    }
}
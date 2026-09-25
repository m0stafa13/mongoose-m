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
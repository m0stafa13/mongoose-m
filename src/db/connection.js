import mongoose from "mongoose";
import { env } from "../config/config.service.js";
import { userModel } from "./model/user.model.js";

// connect with database
export const dbConnection = async () => {
    const uri = env.uri
    //                 , { connectTimeoutMS: 2000 } == time to connect with db
    mongoose.connect(uri).then(() => {

        console.log("database connected");
    }).catch((error) => {
        console.log("cannot connect with database", error);
    })
    await mongoose.syncIndexes()
}
// if i will add any promise in var  i will use async and await
// here i will use then and catch ==> i will not use data from connection 

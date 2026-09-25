import mongoose from "mongoose";
import { env } from "../config/config.service.js";

// connect with database
export const dbConnection = () => {
    const uri = env.uri
    mongoose.connect(uri).then(() => {
        console.log("database connected");
    }).catch((error) => {
        console.log("cannot connect with database", error);
    })
}
// if i will add any promise in var  i will use async and await 
// here i will use then and catch ==> i will not use data from connection 

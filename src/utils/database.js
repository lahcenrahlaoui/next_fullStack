 

import mongoose from "mongoose";
// const mongoose = require("mongoose");
let isConnected = false;

export const connectToDB = async () => {
   console.log("Connecting to")
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    const mongooseOptions = {
        dbName: "share_prompt",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        await mongoose.connect(process.env.MONGODB_URI, mongooseOptions);
        isConnected = true;
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export default async function connectToDB() {
    if (!MONGO_URI)
        return new Error("Mongo URI not found");

    try {
        await mongoose.connect(MONGO_URI);
        console.log("CONNECTED TO DB");
    } catch (error) {
        console.log("ERROR CONNECTING DB :", error);
    }
}
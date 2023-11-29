import mongoose from "mongoose";
import "colors"

const MONGODB_URL = "mongodb://127.0.0.1:27017/backend_practice";

const dbConnection = async () => {
    try {
        const connection = await mongoose.connect(MONGODB_URL);
        console.log(`Connected to DB: ${connection.connection.host}`.bgGreen.white);
    } catch (error) {
        console.error("MongoDB connection Error", error);
        throw error;
    }
};

export default dbConnection;

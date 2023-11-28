import mongoose from "mongoose";

const MONGODB_URL = "mongodb://127.0.0.1:27017/serious_backend_project";

const dbConnection = async () => {
    try {
        const connection = await mongoose.connect(MONGODB_URL);
        console.log(`Connected to DB: ${connection.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection Error", error);
        throw error;
    }
};

export default dbConnection;

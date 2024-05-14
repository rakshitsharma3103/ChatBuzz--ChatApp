import mongoose from "mongoose";

const connectToMongoDB = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB successfully")
    } catch (error) {
        console.log("Error in connecting with MongoDB:", error.message);
    }
}

export default connectToMongoDB;  
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return; 
    }

    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
        throw new Error("MONGODB_URI is not defined in environment variables.");
    }
    
    await mongoose.connect(mongoURI);
    console.log("Connected to Database");
    
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error connecting to Database:", error.message);
      throw new Error(`Database connection failed: ${error.message}`);
    } else {
      console.error("An unknown error occurred while connecting to the Database");
      throw new Error("Database connection failed: Unknown error");
    }
  }
};

export default connectDB;
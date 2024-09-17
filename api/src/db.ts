import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb+srv://apptoquin:afkqb1sq9NaCnJ5C@cluster0.r0orp.mongodb.net/data_base_teste_17-09-2024"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

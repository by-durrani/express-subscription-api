import mongoose from "mongoose";

export const connectToDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI in .env<.development/production>.local"
    );
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "rest_api_db" });
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to db", error);
    process.exit(1);
  }
};

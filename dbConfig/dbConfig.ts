import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in the environment variables");
    }
    await mongoose.connect(process.env.MONGO_URL);

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connection established successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.log(
        "Mongo DB connection error, please make sure db is up and running : " +
          err
      );
      process.exit();
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

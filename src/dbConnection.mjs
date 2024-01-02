import mongoose from "mongoose";
const URI = process.env.MONGO_DB_URI;

export const connectDB = async (cb) => {
    console.log(URI)
  try {
    const conn = await mongoose.connect(URI, {
      socketTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // mongoose.set("useCreateIndex", true);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

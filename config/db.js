import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_ATLAS
        : process.env.MONGO_URI_LOCAL;

    const conn = await mongoose.connect(uri);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

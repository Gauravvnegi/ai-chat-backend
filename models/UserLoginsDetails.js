import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    userNumber: { type: String, required: true },
    password: { type: String, required: true },
    userId: { type: String, required: true, unique: true, default: uuidv4 },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); 

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});


userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


const UserLoginsDetails = mongoose.model("UserLoginsDetails", userSchema);

export default UserLoginsDetails;

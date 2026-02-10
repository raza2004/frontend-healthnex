import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  
isVerified: { type: Boolean, default: false },

verifyEmailTokenHash: { type: String },
verifyEmailTokenExpiry: { type: Date },

resetPasswordTokenHash: { type: String },
resetPasswordTokenExpiry: { type: Date },

  history: [
    {
      disease: String,
      city: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);

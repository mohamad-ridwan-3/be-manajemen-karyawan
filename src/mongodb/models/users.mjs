import mongoose from "mongoose";

const Schema = mongoose.Schema;

// id User | Admin
const users = new Schema(
  {
    id: {
      type: String,
    },
    role: {
      type: String,
    },
    isDefaultAdmin:{
      type: Boolean
    },
    nama: {
      type: String,
    },
    email: {
      type: String,
    },
    fotoProfil: {
      type: String,
    },
    password: {
      type: String,
    },
    isVerification: {
      type: Boolean,
    },
  },
  {
    timestamp: true,
  }
);

export const usersDB = mongoose.model("users", users)

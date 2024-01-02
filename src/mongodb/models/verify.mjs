import mongoose from "mongoose";

const Schema = mongoose.Schema;

const verify = new Schema(
  {
    // id ini id users
    id: {
      type: String,
    },
    // register-admin | lupa-password
    role: {
        type: String
    },
    kode:{
        type: String
    },
    jwt:{
        type: String
    },
    exp: {
        type: String
    }
  },
  {
    timestamp: true,
  }
);

export const verifyDB = mongoose.model("verify", verify)

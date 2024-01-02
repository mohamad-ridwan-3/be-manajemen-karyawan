import mongoose from "mongoose";

const Schema = mongoose.Schema;

// id berhubung dengan id user
const karyawan = new Schema(
  {
    id: {
      type: String,
    },
    jabatan:{
        type: String
    },
    NIK:{
        type: String
    },
    alamat:{
        type: String
    },
    noTelp: {
        type: String
    },
    tglLahir: {
        type: String
    },
    divisi:{
        type: String
    },
    gaji:{
        type: String
    },
    tglBergabung:{
        type: String
    },
    statusKaryawan:{
        type: String
    }
  },
  {
    timestamp: true,
  }
);

export const karyawanDB = mongoose.model("karyawan", karyawan)

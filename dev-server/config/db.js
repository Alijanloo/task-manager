import mongoose from "mongoose";

export function connectToDB() {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, err => {
    if (err) {
      console.log("unable to connect to database");
    } else {
      console.log("connected to mongoDB!");
    }
  });
}

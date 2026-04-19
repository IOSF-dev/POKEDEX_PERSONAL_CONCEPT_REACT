const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "PDXDB",
    });
    console.log("DB correctly connected");
  } catch (error) {
    console.log("error connecting with database: ", error);
  }
};

module.exports = connectDB;

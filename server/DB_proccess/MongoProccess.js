const mongoose = require("mongoose");
const mongDatabase = require("../DB_details/MongoConnect");

const MongoDetails = { ...mongDatabase[0] };
const MONGO_URL = `mongodb://${MongoDetails.username}:${MongoDetails.password}@${MongoDetails.host}:${MongoDetails.port}/${MongoDetails.database}?authSource=admin`;

module.exports.connection = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Succeed connection to MONGO");
  } catch (error) {
    console.log("NOT succeed connection to MONGO...");
    console.log(error);
    throw error;
  }
};

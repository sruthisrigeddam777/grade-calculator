const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
  name: String,
  email: String,
  password:String
});

// Export function to create "SomeModel" model class
module.exports = mongoose.model("UserModel", UserModelSchema);
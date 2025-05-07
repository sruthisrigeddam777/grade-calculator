const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PointsModelSchema = new Schema({
  _id: Schema.Types.ObjectId,
  IdNumber: String,
  Points:String
});

// Export function to create "SomeModel" model class
module.exports = mongoose.model("PointsModel", PointsModelSchema);
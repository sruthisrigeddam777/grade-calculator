const mongoose = require("mongoose");
const mongoURI = process.env.DB_STRING;
module.exports.connection = async () => {
  const connectionParms = {
    useNewUrlParser: true,
  };
  try {
    await mongoose.connect(mongoURI, connectionParms);
    console.log(
      "data base connected using new age coder video in appjs file....."
    );
  } catch (err) {
    console.log(err.message);
    process.exit(0);
  }
};

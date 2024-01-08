const mongoose = require("mongoose");
const Todo = require("./models/Todo");
const { MONGO_URL } = require("../util/config");

console.log("connecting to", MONGO_URL);
if (MONGO_URL && !mongoose.connection.readyState)
  mongoose
    .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("connected to MongoDB");
    });

module.exports = {
  Todo,
};

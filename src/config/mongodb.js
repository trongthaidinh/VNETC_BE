const { default: mongoose } = require("mongoose");
const { env } = require("./environment");

mongoose.connect(env.MONGODB_URI)
  .then(console.log("ok"))
  .catch(console.log("fail"))


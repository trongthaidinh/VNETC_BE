const mongoose = require("mongoose")

const configSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  homepage_slider: {
    type: mongoose.Schema.Types.Mixed, // This can store any data type
    required: true,
  },
  contact_email: {
    type: String,
  },
  phone_number: {
    type: String,
  },
})

const Configuration = mongoose.model("Configuration", configSchema)

module.exports = Configuration

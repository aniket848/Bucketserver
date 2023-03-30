const mongoose = require("mongoose");

const bucketSchema = new mongoose.Schema({
  bucketName: {type: String , required:true},
  cards: [{ name: { type: String }, link: { type: String } }],
});

const Bucket = mongoose.model("bucket", bucketSchema);

module.exports = Bucket;

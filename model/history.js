const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    name:{type:String , required:true},
    link:{type:String , required:true},
    date:{type:String , required:true}
});

const History = mongoose.model("history", historySchema);

module.exports = History;

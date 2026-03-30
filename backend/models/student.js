const mongoose = require("mongoose")
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true,
        min:1
    }

});
module.exports = mongoose.model("student",studentSchema);
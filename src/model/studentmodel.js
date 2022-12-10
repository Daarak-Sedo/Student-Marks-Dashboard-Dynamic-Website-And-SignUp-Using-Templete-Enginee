const mongoose = require("mongoose");

const stdSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subject:{ type: String, required: true },
    marks:{type:Number,required:true},
    rollno:{type:Number,required:true,unique:true}
    // email: { type: String, required: true, unique: true },
    // password: { type: String, required: true }, 
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("students", stdSchema);
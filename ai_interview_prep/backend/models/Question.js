const mongoose=require("mongoose")


const question_schema=new mongoose.Schema({
    session:{type:mongoose.Schema.Types.ObjectId, ref:"Session"},
    question:String,
    answer:String,
    note:String,
    isPinned:{type:Boolean,default:false}
},
{timestamps:true}
)


module.exports=mongoose.model("Question",question_schema)
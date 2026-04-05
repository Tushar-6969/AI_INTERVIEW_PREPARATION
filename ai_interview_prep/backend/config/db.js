const mongoose=require("mongoose")

const connect_db=async()=>{
    try{
        mongoose.connect(process.env.MONGO_URI,{})
        console.log(" mdb connected sucess ")
    }catch(err){
        console.log(" md not connected err ",err)
        process.exit(1)
    }
}

module.exports=connect_db;
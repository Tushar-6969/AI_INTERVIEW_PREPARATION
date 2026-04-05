const mongoose=require("mongoose");

async function main(){
await mongoose.connect("mongodb://127.0.0.1:27017/tests")    
}


main().then((res)=>{
    console.log("mdb connected logs",res)
})
.catch((err)=>{
    console.log(" err connecting mdb ")
})





// scheama 
const user_schema=new mongoose.Schema({
    name:{type:String},
    email:String,
    age:Number,

})



const user=mongoose.model("user",user_schema);


const user1=new user({
    name:"tushar",
    email:"tus@",
    age:23
})


// user1.save().then((res)=>{
//     console.log("saved ",res)
// }).catch((err)=>{
//     console.log(err)
// })



user.find({name:"tushar"}).then((res)=>{console.log(res)})

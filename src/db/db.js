
const mongoose = require("mongoose")

function connectDb(){
    
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("DB is connected ")
    })
    .catch((err)=>{
        console.log("Db is not Connected " , err)
    })
    
}



module.exports=connectDb
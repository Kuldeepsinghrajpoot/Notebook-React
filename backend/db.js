const mongoose =  require('mongoose');
const mongoURI = "";

const  connectToMongo=async()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connect to mongoes succefully");
    })
}

module.exports= connectToMongo;
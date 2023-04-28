const mongoose =  require('mongoose');
const mongoURI = "mongodb+srv://kuldeepsinghrajpoot:kuldeepsinghrajpoot@cluster0.mdl5xlr.mongodb.net/noteBook?retryWrites=true&w=majority";

const  connectToMongo=async()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connect to mongoes succefully");
    })
}

module.exports= connectToMongo;
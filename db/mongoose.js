const mongoose=require('mongoose');

const db="mongodb+srv://brahma:brahma@cluster0.bp5x20b.mongodb.net/"

//const localdb='mongodb://localhost:27017/Fitbizz'

mongoose.Promise=global.Promise;
mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:false,
    
}).then(()=>{
    console.log("Connected to MongooseDb Successfully");
}).catch((err)=>{
    console.log("Error while attempting to connect to MongoDb");
    console.log(err);
});

module.exports={mongoose}

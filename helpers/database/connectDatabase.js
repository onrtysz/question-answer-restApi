const mongoose = require('mongoose');


const connectDatabase = () => {

    mongoose.connect(process.env.Mongo_URI, { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true })
        .then( console.log("MongoDb collection Succesful") )
        .catch(err => console.error(err))
}

module.exports=connectDatabase
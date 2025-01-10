const mongoose = require('mongoose')
const validator = require('validator')

//Mongoose 6 always behaves as if useNewUrlParser , useUnifiedTopology , and useCreateIndex are true , and useFindAndModify is false .

mongoose.connect(process.env.MONGODB_URL,{
    
    //from the course:
    //useNewUrlParser:true,
    //useCreateIndex:true,
    //useFindAndModify:false
    
})
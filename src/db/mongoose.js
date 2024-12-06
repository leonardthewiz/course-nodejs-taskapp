const mongoose = require('mongoose')
const validator = require('validator')

//Mongoose 6 always behaves as if useNewUrlParser , useUnifiedTopology , and useCreateIndex are true , and useFindAndModify is false .

mongoose.connect('mongodb://localhost:27017/task-manager-api',{
    
    //from the course:
    //useNewUrlParser:true,
    //useCreateIndex:true,
    //useFindAndModify:false
    
})
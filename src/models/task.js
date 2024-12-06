const mongoose = require('mongoose')
const validator = require('validator')

const Task = mongoose.model('Task',{
    description:{
        required:true,
        type:String,
        trim:true
    },
    completed:{
        type: Boolean,
        default:false,
        required:false
    }
})

module.exports = Task
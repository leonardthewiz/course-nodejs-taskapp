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
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

module.exports = Task
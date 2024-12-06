const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User',{
    name:{
        type: String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('User must contain an email')
            }
        }
    },
    age:{
        type: Number,
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    password:{
        type:String,
        minLength:6,
        trim:true,
        validate(value){
            if(value.includes('password')){
                throw new  Error("User password cannot contain the string password")
            }
        }
    }
})

module.exports = User
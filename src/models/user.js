const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema(
    {
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
            unique:true,
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
        },
        tokens:[{
            token:{
                type:String,
                required:true
            }
        }],
        avatar:{
            type:Buffer
        }
    },{
        timestamps:true
    }
)

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

//Methods are accessible on the instance

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    
    //fields to delete when requesting info
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    
    return userObject
}

userSchema.methods.generateAuthToken = async function (){
    
    //The user that calls this function
    const user = this
    //The token that is generated
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

//Statics are accessible on the Model
userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})

    if(!user){
        throw new Error("Unable to login!")
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if (!isMatch){
        throw new Error("Unable to login!")
    }

    return user
}

userSchema.pre('save',async function(next){
    const user = this
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

userSchema.pre('remove',async function(next){
    const user = this
    await Task.deleteMany({owner:user._id})
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User
require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('674227304c4dc9b2d7d27a91',{age:1}).then((user)=>{
    console.log(user)
    return User.countDocuments({age:1})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})
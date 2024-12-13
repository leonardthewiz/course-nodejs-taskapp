require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('674227304c4dc9b2d7d27a91',{age:1}).then((user)=>{
    console.log("user:")
    console.log(user)
    return User.countDocuments({age:1})
}).then((result)=>{
    console.log("result:")
    console.log(result)
}).catch((e)=>{
    console.log("error: ")
    console.log(e)
})

const updateAgeAndCount = async (id,age)=>{
    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age})
    console.log("count is ")
    console.log(count)
    return count
}

updateAgeAndCount('67421d856b3e2424d8d3a476').then((count)=>{
    console.log("count of users same age")
    console.log(count)
})
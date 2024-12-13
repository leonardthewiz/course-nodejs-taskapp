require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('674222b4136581461bd7ecc9').then((task)=>{
    console.log(task + " removed")
    return Task.countDocuments({completed:false})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:false})
    return count
}

deleteTaskAndCount('674222b4136581461bd7ecc9').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})
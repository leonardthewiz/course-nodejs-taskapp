const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require('./db/mongoose.js')

const User = require('./models/user.js')
const Task = require('./models/task.js')

const UserRouter = require ('./routers/user')
const TaskRouter = require ('./routers/task')

app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)

app.listen(port,()=>{
    console.log("server is up on " + port)
})

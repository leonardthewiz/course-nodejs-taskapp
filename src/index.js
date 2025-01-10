const express = require('express')
const app = express()
const port = process.env.PORT
require('./db/mongoose.js')

const UserRouter = require ('./routers/user')
const TaskRouter = require ('./routers/task')

app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)

app.listen(port,()=>{
    console.log("server is up on " + port)
})
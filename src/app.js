const express = require('express')
const app = express()
require('./db/mongoose.js')

const UserRouter = require ('./routers/user')
const TaskRouter = require ('./routers/task')
const TestRouter = require ('./routers/tests')

app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)
app.use(TestRouter)

module.exports = app
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require('./db/mongoose.js')
const User = require('./models/user.js')
const Task = require('./models/task.js')

app.use(express.json())

app.post('/users',(req,res)=>{

    const user = new User(req.body)
    console.log(user)

    user.save().then(()=>{
        res.send(user)
    }).catch((e)=>{
        res.status(400)
        res.send(e)
    })
})

app.get('/users',(req,res)=>{
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((error)=>{
        res.status(500).send()
    })
})

app.get('/users/:id',(req,res)=>{
    User.findById(req.params.id).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((error)=>{
        res.status(500).send()
    })
})

app.post('/tasks',(req,res)=>{

    const task = new Task(req.body)
    console.log(task)

    task.save().then(()=>{
        res.send(task)
    }).catch((e)=>{
        res.status(400)
        res.send(e)
    })
})

app.get('/tasks',(req,res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((error)=>{
        res.status(500).send()
    })
})

app.get('/tasks/:id',(req,res)=>{
    Task.findById(req.params.id).then((task)=>{
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch((error)=>{
        res.status(500).send()
    })
})



app.listen(port,()=>{
    console.log("server is up on " + port)
})
const express = require('express')
const router = new express.Router()
const Task = require('../models/task.js')
const auth = require('../middleware/auth.js')

router.post('/tasks',auth,async (req,res)=>{
    try{
        const task = new Task({
            ...req.body,
            owner: req.user._id
        })

        await task.save().then(()=>{
            res.send(task)
        })
    } catch (e){
        res.status(400)
        res.send(e)
    }
})

router.get('/tasks',async (req,res)=>{
    try{
        await Task.find({}).then((tasks)=>{
            res.send(tasks)
        })
    } catch(e){
        res.status(500).send()
    }
})

router.get('/tasks/:id',async (req,res)=>{
    try{
        await Task.findById(req.params.id).then((task)=>{
            if(!task){
                return res.status(404).send()
            }
                res.send(task)
            })
    } catch(e){
        res.status(500).send()
    }
})

router.patch('/tasks/:id',async (req,res)=>{
    const updates = Object.keys(req.body)    
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:"invalid updates!"})
    }

    try{
        const task = await Task.findById(req.params.id)
        updates.forEach((update)=>{task[update] = req.body[update]})
        await task.save()

        if(!task){
            res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id',async (req,res)=>{

    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send()
    }
})

module.exports = router
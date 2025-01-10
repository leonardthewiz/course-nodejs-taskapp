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

router.get('/tasks',auth,async (req,res)=>{
    const match = {}
    const sort = {}

    if (req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try{
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks)
    } catch(e){
        res.status(500).send()
    }
})

router.get('/tasks/:id',auth,async (req,res)=>{
    const _id = req.params.id
    try{
        const task = await Task.findOne({_id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send()
    }
})

router.patch('/tasks/:id',auth,async (req,res)=>{
    const updates = Object.keys(req.body)    
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:"invalid updates!"})
    }

    try{
        const task = await Task.findOne({_id:req.params.id, owner:req.user._id})        
        
        if(!task){
            res.status(404).send()
        }        

        updates.forEach((update)=>{task[update] = req.body[update]})
        await task.save()

        res.send(task)
    } catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id',auth,async (req,res)=>{
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send()
    }
})

module.exports = router
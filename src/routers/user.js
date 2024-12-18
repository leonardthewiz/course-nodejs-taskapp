const express = require('express')
const router = new express.Router()

const User = require('../models/user.js')

router.post('/users', async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    } catch(e){
        res.status(400)
        res.send(e)
    } 
})

router.get('/users',async (req,res)=>{
    console.log("getting")
    try{
        await User.find({}).then((users)=>{
            res.send(users)
        })
    } catch(e){
        console.log(e)
        res.status(500).send()

    }
})

/*
router.get('/users/:id',async (req,res)=>{

    try{
        await User.findById(req.params.id).then((user)=>{
            if(!user){
                return res.status(404).send()
            }
            res.send(user)
        })
    } catch(e){
        res.status(500).send()
    }
})

router.patch('/users/:id',async (req,res)=>{
    const updates = Object.keys(req.body)    
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:"invalid updates!"})
    }

    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    } catch(e){
        res.status(500).send()
    }
})

router.delete('/users/:id',async (req,res)=>{

    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    } catch(e){
        res.status(500).send()
    }
})
 */
module.exports = router
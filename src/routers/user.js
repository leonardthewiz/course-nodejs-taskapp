const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth.js')

const User = require('../models/user.js')

router.post('/users', async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch(e){
        res.status(400)
        res.send(e)
    } 
})

router.get('/users/me',auth,async (req,res)=>{
    try{
        res.send(req.user)
    } catch(e){
        res.status(500).send()
    }
})

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

router.patch('/users/me',auth,async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
    const user = req.user

    if(!isValidOperation){
        return res.status(400).send({error:"invalid updates!"})
    }

    try{        
        updates.forEach((update) => user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch(e){
        res.status(500).send()
    }
})

router.delete('/users/me',auth,async (req,res)=>{
    try{
        await req.user.deleteOne()
        res.send(req.user)
    } catch(e){
        res.status(500).send()
    }
})

router.post('/users/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch(e){
        res.status(400).send()
        console.log(e)
    }
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()        
        res.send()
    }catch(e){
        console.log(e)
        res.status(500).send()
    }
})

module.exports = router
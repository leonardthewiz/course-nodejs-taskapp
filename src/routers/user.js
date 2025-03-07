const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth.js')
const multer = require('multer')
const User = require('../models/user.js')
const sharp = require('sharp')
const {sendWelcomeEmail} = require('../emails/account.js')
const {sendCancelEmail} = require('../emails/account.js')

router.post('/users', async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        sendWelcomeEmail(user.email,user.name)
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
        sendCancelEmail(req.user.email,req.user.name)
        res.send(req.user)
    } catch(e){
        console.log(e)
        res.status(500).send()
    }
})

router.post('/users/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
        res.send(user)
    }catch(e){
        res.status(400).send()
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
        res.status(500).send()
    }
})

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Issue with file'))
        }
        return cb(undefined,true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:'issue'})
})


router.delete('/users/me/avatar', auth, async (req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:'issue'})
})

router.get('/users/:id/avatar', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    } catch (e){
        res.status(404).send()
    }
})

module.exports = router
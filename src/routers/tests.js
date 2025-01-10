const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth.js')

router.get('/tests',async (req,res)=>{
    const result = "success"
    res.send(result)
})

module.exports = router
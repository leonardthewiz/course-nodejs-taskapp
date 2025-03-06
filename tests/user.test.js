const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const UserOneId = new mongoose.Types.ObjectId()
const UserOne = {
    _id: UserOneId,
    name:'Init user',
    email:'first@user.com',
    password:'testpass',
    tokens:[{
        token:jwt.sign({_id:UserOneId},process.env.JWT_SECRET)
    }]
}

beforeEach(async ()=>{
    await User.deleteMany()
    await new User(UserOne).save()
})

afterEach(async ()=>{
    await User.deleteMany()
})


test('Should signup a new user',async()=>{
    await request(app).post('/users').send({
        name:"Test user",
        email:"test@user.com",
        password:'testpass'
    }).expect(201)
})

test('Should login existing user',async()=>{
    await request(app).post('/users/login').send({
        email: UserOne.email,
        password: UserOne.password
    }).expect(200)
})

test('Should not login non-existent user',async()=>{
    await request(app)
        .post('/users/login')
        .send({
            email: UserOne.email,
            password:"wrongpassword"
        })
        .expect(400)
})

test('Should get profile for authenticated user',async()=>{
    await request(app)
        .get('/users/me')
        .set('Authorization',`Bearer ${UserOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for authenticated user',async()=>{
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for authenticated user',async()=>{
    await request(app)
        .delete('/users/me')
        .set('Authorization',`Bearer ${UserOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not delete account for authenticated user',async()=>{
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})
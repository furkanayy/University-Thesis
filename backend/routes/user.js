const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const router = express.Router()

// kullanıcı kayıt
router.post("/signup", async (req,res) => {
    const name = req.body.name
    const surname = req.body.surname
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password

    const isUserExist = await User.find({username: username})

    if(isUserExist.length === 0){
        let user = new User()
        user.name = name
        user.surname = surname
        user.email = email
        user.username = username
        user.password = password
        user.save()
        res.send("Registration was successful.")
    }
    else{
        res.send("This username is taken! Please enter another username.")
    }
})

// kullanıcı giriş
router.post("/signin", async (req,res) => {
    const username = req.body.username
    const password = req.body.password

    const user = await User.findOne({username: username , password: password})

    if(user !== null){
        const token = jwt.sign({userId: user.id}, process.env.ACCESS_TOKEN_SECRET)
        res.send([token, username])
    }
    else{
        res.send(["",""])
    }
})

router.post("/getprofileinfo",async (req,res) => {
    const userId = mongoose.Types.ObjectId(jwt.decode(req.body.token).userId)

    const user = await User.findOne({_id:userId})

    res.send(user)
})

router.post("/editprofile",async (req,res) => {
    const userId = mongoose.Types.ObjectId(jwt.decode(req.body.token).userId)

    let user = await User.findOne({_id:userId})
    let isUsed = await User.findOne({username:req.body.username})

    if(isUsed === null || user.username === req.body.username){
        user.name = req.body.name
        user.surname = req.body.surname
        user.email = req.body.email
        user.username = req.body.username
        user.password = req.body.password

        user.save()

        res.send(["Your profile updated.", 1])
    }
    else{
        res.send(["Username is already in use.", 0])
    }

})

module.exports = router
const express = require("express")
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')
const router = express.Router()
const Mahjong = require("../models/mahjong")

router.post("/savescore", (req,res) => {
    const time = req.body.time
    const userId = mongoose.Types.ObjectId(jwt.decode(req.body.token).userId)

    let mahjong = new Mahjong()
    mahjong.userId = userId
    mahjong.time = time

    mahjong.save()

    res.send("The score was successfully saved.")
})

router.post("/personalscores", async (req,res) => {
    const userId = mongoose.Types.ObjectId(jwt.decode(req.body.token).userId)

    const myScores = await Mahjong.find({userId: userId}).sort({time:1})

    res.send(myScores)
})

router.get("/allscores", (req,res) => {
    Mahjong.aggregate([
        {
            $lookup:{
                from:"users",
                localField:"userId",
                foreignField:"_id",
                as:"user"
            }
        }
    ]).sort({time:1}).exec((err, result) => {
        res.send(result)
    })
})

module.exports = router
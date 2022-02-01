const express = require("express")
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')
const router = express.Router()
const Maze = require("../models/maze")

router.post("/savescore", (req,res) => {
    const time = req.body.time
    const moves = req.body.moves
    const userId = mongoose.Types.ObjectId(jwt.decode(req.body.token).userId)

    let maze = new Maze()
    maze.userId = userId
    maze.time = time
    maze.move = moves
    maze.sum = (+time + +moves)

    maze.save()

    res.send("The score was successfully saved.")
})

router.post("/personalscores", async (req,res) => {
    const userId = mongoose.Types.ObjectId(jwt.decode(req.body.token).userId)

    const myScores = await Maze.find({userId: userId}).sort({sum:1})

    res.send(myScores)
})

router.get("/allscores", (req,res) => {
    Maze.aggregate([
        {
            $lookup:{
                from:"users",
                localField:"userId",
                foreignField:"_id",
                as:"user"
            }
        }
    ]).sort({sum:1}).exec((err, result) => {
        res.send(result)
    })
})

module.exports = router
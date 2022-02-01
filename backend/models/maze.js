const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId

const mazeSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  move: {
    type: Number,
    required: true
  },
  sum: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Maze', mazeSchema)
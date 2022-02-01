const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId

const mahjongSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Mahjong', mahjongSchema)
const express = require("express")
const cors = require("cors")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const contactRouter = require("./routes/contact")
const mahjongRouter = require("./routes/mahjong")
const mazeRouter = require("./routes/maze")
const userRouter = require("./routes/user")
require("dotenv").config()

mongoose.connect('mongodb://localhost/mentorunuz', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride("_method"))

app.use("/contact",contactRouter)
app.use("/mahjong",mahjongRouter)
app.use("/maze",mazeRouter)
app.use("/user",userRouter)

app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`)
})
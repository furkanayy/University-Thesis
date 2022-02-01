const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()
const Contact = require("../models/contact")

router.post("/sendmessage", (req, res) => {
    const name = req.body.name
    const surname = req.body.surname
    const email = req.body.email
    const message = req.body.message

    let contact = new Contact()
    contact.name = name
    contact.surname = surname
    contact.email = email
    contact.message = message

    contact.save()

    res.send("Your message has been sent successfully. Thank you for your interest.")
})

module.exports = router
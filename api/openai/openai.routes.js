const express = require('express')
const { generateSongs } = require('./openai.controller')
const router = express.Router()

router.post('/generateSongs', generateSongs)

module.exports = router

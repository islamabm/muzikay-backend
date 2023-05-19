const express = require('express')
const { generateSongs, getEmotion } = require('./openai.controller')
const router = express.Router()

router.get('/getEmotion', getEmotion)
router.post('/generateSongs', generateSongs)

module.exports = router

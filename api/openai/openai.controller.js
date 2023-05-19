const openaiService = require('./openai.service.js')

async function generateSongs(req, res) {
  try {
    const mood = req.body.mood
    const songs = await openaiService.askGpt(mood)
    console.log('songs', songs)
    res.json(songs)
  } catch (err) {
    console.error('Failed to generate songs', err)
    res.status(500).send({ err: 'Failed to generate songs' })
  }
}

module.exports = {
  generateSongs,
}

const openaiService = require('./openai.service.js')

async function getEmotion(req, res) {
  try {
    console.log('Request received for getEmotion')
    const text = req.query.text
    console.log('Text from query:', text)
    let tags = [
      'Party',
      'At Home',
      'Discover',
      'Focus',
      'Alternative',
      'Dance-Electronic',
      'Travel',
      'Indie',
      'Sleep',
      'Mood',
      'Rock',
      'Chill',
      'Decades',
      'Workout',
      'Pop',
      'Folk & Acoustic',
      'Hip-Hop',
    ]
    const emotion = await openaiService.askGptEmotion(text, tags)
    console.log('Sending response:', { emotion: emotion })
    res.json({ emotion: emotion })
  } catch (err) {
    console.error('Failed to detect emotion', err)
    res.status(500).send({ err: `Failed to detect emotion: ${err.message}` })
  }  
}

async function generateSongs(req, res) {
  try {
    const emotion = req.body.emotion
    const songs = await openaiService.askGptSongs(emotion)
    res.json(songs)
  } catch (err) {
    console.error('Failed to generate songs', err)
    res.status(500).send({ err: 'Failed to generate songs' })
  }
}

module.exports = {
  getEmotion,
  generateSongs,
}

// const openai = require('openai')

// openai.apiKey = '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'

// async function getSongsForMood(mood) {
//   // Generate text using OpenAI
//   const response = await openai.Completion.create({
//     engine: 'text-davinci-002',
//     prompt: `Generate 10 song suggestions for someone in a ${mood} mood`,
//     max_tokens: 60,
//   })

//   // Extract song names from response
//   const songNames = response.choices[0].text.split('\n')

//   // Fetch songs from your MongoDB based on the song names
//   // This will depend on how your MongoDB is set up
//   const songs = await fetchSongsFromDB(songNames)
//   console.log('songs', songs)
//   return songs
// }
const { Configuration, OpenAIApi } = require('openai')
const { getRandomSongsFromMoodTag } = require('../../services/db.service')
const openAi = new OpenAIApi(
  new Configuration({
    apiKey: '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',
  })
)

async function askGpt(mood) {
  const songsFromDb = await getRandomSongsFromMoodTag(mood, 10)
  console.log('songsFromDb', songsFromDb)
  return songsFromDb
}
function parseSongs(text) {
  // Split the text by newline
  const lines = text.split('\n')

  // Remove the first line (it's the prompt continuation)
  lines.shift()

  // Extract the song titles by removing the leading numbers and trimming the whitespace
  const songs = lines.map((line) => line.replace(/^\d+\.\s*/, '').trim())
  console.log('songs', songs)
  return songs
}

module.exports = {
  askGpt,
}

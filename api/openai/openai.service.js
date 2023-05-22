const { Configuration, OpenAIApi } = require('openai')
require('dotenv').config()
const { getRandomSongsFromMoodTag } = require('../../services/db.service')
const openAi = new OpenAIApi(
  new Configuration({
    apiKey: "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",
  })
)

async function askGptEmotion(text, tags) {
  let tagList = tags.join(', ')
  const completion = await openAi.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `Here are some tags: ${tagList}.`,
      },
      {
        role: 'user',
        content: `Given that I'm feeling like this: ${text}, which tag would you choose?`,
      },
    ],
  })

  let fullResponse = completion.data.choices[0].message.content.trim()
  console.log('Full Response', fullResponse)

  let chosenTag = fullResponse.match(/"([^"]+)"/)[1]
  console.log('chosenTag', chosenTag)

  return chosenTag
}

async function askGptStationName(emotion) {
  const response = await openAi.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `I'm helping to generate a creative name for a radio station. The theme of the station revolves around the emotion "${emotion}". The name should be three to four words long and catchy.`,
      },
      {
        role: 'user',
        content: `Given these constraints, what should be the name?`,
      },
    ],
  })

  let fullResponse = response.data.choices[0].message.content.trim()
  console.log('Full Response', fullResponse)
  return fullResponse
}

async function askGptSongs(emotion) {
  const songsFromDb = await getRandomSongsFromMoodTag(emotion, 10)
  return { songs: songsFromDb }
}

module.exports = {
  askGptEmotion,
  askGptSongs,
  askGptStationName,
}
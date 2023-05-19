const { Configuration, OpenAIApi } = require('openai')
require('dotenv').config()
const { getRandomSongsFromMoodTag } = require('../../services/db.service')
const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.CHAT_GPT_AI,
  })
)

async function askGptEmotion(text, tags) {
  console.log('text in service openai', text)
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

async function askGptSongs(emotion) {
  const songsFromDb = await getRandomSongsFromMoodTag(emotion, 10)
  return { songs: songsFromDb }
}

module.exports = {
  askGptEmotion,
  askGptSongs,
}

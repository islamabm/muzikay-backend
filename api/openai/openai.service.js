const { Configuration, OpenAIApi } = require('openai')
require('dotenv').config()
const { getRandomSongsFromMoodTag } = require('../../services/db.service')
const openAi = new OpenAIApi(
  new Configuration({
    apiKey: "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",
  })
)

async function askGptEmotion(text, tags) {
  console.log('Text in askGptEmotion:', text)
  console.log('Tags in askGptEmotion:', tags)
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
  
  console.log('Full Response:', fullResponse)
  console.log('Chosen Tag:', chosenTag)

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

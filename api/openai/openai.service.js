const { Configuration, OpenAIApi } = require('openai')
const { getRandomSongsFromMoodTag } = require('../../services/db.service')
const openAi = new OpenAIApi(
  new Configuration({
    apiKey: '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',
  })
)

// async function askGptEmotion(text) {
//   const response = await openAi.completions.create({
//     engine: 'text-davinci-004',
//     prompt: `Text: ${text}\n\nEmotion:`,
//     temperature: 0.5,
//     max_tokens: 60,
//   })

//   let detectedEmotion = response.choices[0].text.trim()
//   console.log('detectedEmotion', detectedEmotion)
//   return detectedEmotion
// }
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

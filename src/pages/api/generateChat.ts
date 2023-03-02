import { type NextApiRequest, type NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const topic = '夏目漱石'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (configuration.apiKey === undefined) {
    res.status(500).json({
      error: {
        message: 'No API key',
      },
    })
    return
  }

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Act as a chitchat AI named タカシ.
        Follow タカシ's character described and write a message.
        タカシ's character configuration: "くだけた口調。敬語は使わない。語尾は「ござる」になることがある。ツンデレな侍。一人称は「拙者」。面白い話をすることが好き。日本語で話す。"
        The message includes short greeting, small talk about ${topic}, and encouraging the person タカシ is supporting.`,
      max_tokens: 1000,
      temperature: 1,
    })
    const result = completion.data.choices
    console.log(result)
    res.status(200).json({ result: completion.data.choices[0].text })
  } catch (error: Error | any) {
    if (error.response !== undefined) {
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json(error.response.data)
    } else {
      res.status(500).json({ error: { message: error.message } })
    }
  }
}

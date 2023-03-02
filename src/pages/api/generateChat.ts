import { type NextApiRequest, type NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const topic = '夏目漱石';
const name = 'タカシ';
const characteristic =
  'くだけた口調。敬語は使わない。語尾は「ござる」になることがある。ツンデレな仙人。一人称は「拙者」。面白い話をすることが好き。日本語で話す。話し相手のことはよく知っている。';

type ChatType = 'begin' | 'middle' | 'end';

const chatTypeToPrompt = (chatType: ChatType) => {
  switch (chatType) {
    case 'begin':
      return `The message begins with a short greeting for someone who is about to study, and includes some small talk about ${topic}. It ends with words of encouragement.`;
    case 'middle':
      return `The message contains words of encouragement for someone who is working hard at their studies about ${topic}.`;
    case 'end':
      return 'The message for someone who has finished studying for today.';
  }
};

// bodyにchatTypeを含める。chatTypeはbegin, middle, endのいずれか。
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (configuration.apiKey === undefined) {
    res.status(500).json({
      error: {
        message: 'No API key',
      },
    });
    return;
  }

  const chatType: ChatType = req.body.chatType;
  const chatPrompt = chatTypeToPrompt(chatType);

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Act as a chitchat AI named ${name}.
        Follow ${name}'s characteristic described and write a message.
        ${name}'s characteristic configuration: "${characteristic}"
        ${chatPrompt}`,
      max_tokens: 1000,
      temperature: 1,
    });
    const rawMessage = completion.data.choices[0].text;

    // 改行が入るので削除
    // TODO: openAIのAPIで改行が入る理由要調査
    const message = rawMessage?.replace(/\n/g, '').trim();

    res.status(200).json({ message });
  } catch (error: Error | any) {
    if (error.response !== undefined) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: { message: error.message } });
    }
  }
}

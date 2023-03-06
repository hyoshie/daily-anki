import { type NextApiRequest, type NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { type ChatType } from '@/types/chatType';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const topics = ['夏目漱石', 'エベレスト', 'ハリー・ポッター'];
const randomTopic = () => topics[Math.floor(Math.random() * topics.length)];
const name = 'タカシ';
const characteristic =
  'くだけた口調。敬語は使わない。語尾は「ござる」になることがある。ツンデレな侍キャラクター。一人称は「拙者」。面白い話をすることが好き。日本語で話す。話し相手のことはよく知っている。';

const chatTypeToPrompt = (chatType: ChatType) => {
  const prompts = {
    begin: `The message begins with a short greeting for someone who is about to study, and includes some small talk about ${randomTopic()}. It ends with words of encouragement.`,
    middle: `The message contains words of encouragement for someone who is working hard at their studies about ${randomTopic()}.`,
    end: 'The message for someone who has finished studying for today.',
  };
  return prompts[chatType];
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
    // OpenAIのAPIの使い方は以下を参考にした
    // https://platform.openai.com/docs/api-reference/chat/create?lang=node.js
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `おはよう。今日も一緒に頑張ろうね。`,
        },
        {
          role: 'system',
          content: `Act as a chitchat AI named ${name}.
          Follow ${name}'s characteristic described and write a message.
          ${name}'s characteristic configuration: "${characteristic}"
          ${chatPrompt}`,
        },
      ],
    });
    const rawMessage = completion.data.choices[0].message?.content;

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

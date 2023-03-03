import { type ChatType } from '@/types/chatType';

export const fetchChatMessage = async (chatType: ChatType) => {
  try {
    const response = await fetch('/api/generateChat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatType }),
    });

    const json = await response.json();

    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return json.message;
  } catch (error) {
    console.error(error);
  }
};

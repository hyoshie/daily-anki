import { Button, Flex } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChatMessage } from '@/features/chat/components/ChatMessage';
import { fetchChatMessage } from '@/utils/fetchChatMessage';

export default function Home() {
  const [beginMessage, setBeginMessage] = useState('');

  useEffect(() => {
    const fetchBeginMessage = async () => {
      const message = await fetchChatMessage('begin');
      setBeginMessage(message);
    };
    void fetchBeginMessage();
  }, []);

  return (
    <>
      <Head>
        <title>Daily Anki</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Flex direction='column' align='center'>
          <ChatMessage message={beginMessage} />
          <Link href='/deck'>
            <Button>Start</Button>
          </Link>
          {/* <Link href='/chat'>
            <Button>Start</Button>
          </Link> */}
        </Flex>
      </main>
    </>
  );
}

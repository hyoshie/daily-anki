import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import React, { type FC, useEffect, useState } from 'react';

const imageUrl =
  'https://1.bp.blogspot.com/-ZqRV1i42ELM/VJF_J7IvQjI/AAAAAAAApzk/GCpLXcqU6WE/s800/animalface_neko.png';

interface Props {
  chatType: 'begin' | 'middle' | 'end';
}

export const ChatAI: FC<Props> = ({ chatType }: Props) => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchChat = async () => {
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

        setMessage(json.message);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchChat();
  }, []);

  return (
    <Box>
      <Box my={4}>
        <Flex>
          <Avatar src={imageUrl} />
          <Box w='lg' bg='gray.100' p={4} borderRadius='md' boxShadow='md' whiteSpace='pre-wrap'>
            <Text>{message}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

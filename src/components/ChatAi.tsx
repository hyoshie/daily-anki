import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const imageUrl =
  'https://1.bp.blogspot.com/-ZqRV1i42ELM/VJF_J7IvQjI/AAAAAAAApzk/GCpLXcqU6WE/s800/animalface_neko.png';

export const ChatAI = () => {
  const [message, setMessage] = useState<string>('');

  const handleClick = async () => {
    try {
      const response = await fetch('/api/generateChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

  return (
    <Box>
      <Button onClick={handleClick}>Generate</Button>
      <Box my={4}>
        <Flex>
          <Avatar src={imageUrl} />
          <Box bg='gray.100' p={4} borderRadius='md' boxShadow='md' whiteSpace='pre-wrap'>
            <Text>{message}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

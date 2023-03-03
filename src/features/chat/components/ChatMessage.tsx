import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import React, { type FC } from 'react';

const imageUrl =
  'https://1.bp.blogspot.com/-ZqRV1i42ELM/VJF_J7IvQjI/AAAAAAAApzk/GCpLXcqU6WE/s800/animalface_neko.png';

interface Props {
  message: string;
}

export const ChatMessage: FC<Props> = ({ message }: Props) => {
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

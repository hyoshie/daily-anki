import { Box, Text, Flex } from '@chakra-ui/react';
import React, { type FC } from 'react';
import { MovingCharacter } from './MovingCharacter';

interface Props {
  message: string;
}

export const ChatMessage: FC<Props> = ({ message }: Props) => {
  return (
    <Box my={4}>
      <Flex>
        <MovingCharacter />
        <Box w='lg' bg='gray.100' p={4} borderRadius='md' boxShadow='md' whiteSpace='pre-wrap'>
          <Text>{message}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

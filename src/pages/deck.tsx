import { Box, Button, Container, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChatMessage } from '@/features/chat/components/ChatMessage';
import { FlashCard } from '@/features/deck/components/FlashCard';
import { FlashCardActionButton } from '@/features/deck/components/FlashCardActionButton';
import { type FlashCardData } from '@/features/deck/interfaces';
import { fetchChatMessage } from '@/utils/fetchChatMessage';

const cards: FlashCardData[] = [
  { question: 'What is the capital of Japan?', answer: 'Tokyo' },
  { question: 'What is the highest mountain in the world?', answer: 'Mount Everest' },
  { question: 'What is the largest planet in our solar system?', answer: 'Jupiter' },
  { question: 'What is the largest country in the world?', answer: 'Russia' },
  { question: 'What is the most populated country in the world?', answer: 'China' },
  { question: 'What is the smallest country in the world?', answer: 'Vatican City' },
  { question: 'What is the longest river in the world?', answer: 'Nile River' },
  { question: 'What is the deepest ocean in the world?', answer: 'Pacific Ocean' },
  { question: 'What is the hottest continent in the world?', answer: 'Africa' },
  { question: 'What is the coldest continent in the world?', answer: 'Antarctica' },
];

function Deck() {
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [endMessage, setEndMessage] = useState('');

  useEffect(() => {
    const fetchFinishMessage = async () => {
      const message = await fetchChatMessage('end');
      setEndMessage(message);
    };
    void fetchFinishMessage();
  }, []);

  const handleShowAnswer = () => {
    setIsAnswerShown(true);
  };

  const handleDifficulty = () => {
    setIsAnswerShown(false);
    setCurrentCardIndex(currentCardIndex + 1);
  };

  if (currentCardIndex >= cards.length) {
    return (
      <Flex direction='column' align='center'>
        <ChatMessage message={endMessage} />
        <Link href='/'>
          <Button>Finish</Button>
        </Link>
      </Flex>
    );
  }

  return (
    <Container maxW='xl' mt='16' centerContent>
      <FlashCard card={cards[currentCardIndex]} isAnswerShown={isAnswerShown} />

      <Box textAlign='center' justifyContent='center' position='fixed' bottom='20px'>
        <FlashCardActionButton
          isAnswerShown={isAnswerShown}
          handleShowAnswer={handleShowAnswer}
          handleDifficulty={handleDifficulty}
        />
      </Box>
    </Container>
  );
}

export default Deck;

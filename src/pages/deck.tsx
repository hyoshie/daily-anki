import fs from 'fs';
import path from 'path';
import { Box, Button, Container, Flex } from '@chakra-ui/react';
import { parse } from 'csv-parse/sync';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChatMessage } from '@/features/chat/components/ChatMessage';
import { FlashCard } from '@/features/deck/components/FlashCard';
import { FlashCardActionButton } from '@/features/deck/components/FlashCardActionButton';
import { type FlashCardData } from '@/features/deck/interfaces';
import { fetchChatMessage } from '@/utils/fetchChatMessage';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'sample.csv');
  const data = fs.readFileSync(filePath, 'utf8');

  const records = parse(data);
  records.shift();

  const cards = records.map((record: [string, string]) => {
    return {
      question: record[0],
      answer: record[1],
    };
  });

  return {
    props: {
      cards,
    },
  };
}

interface Props {
  cards: FlashCardData[];
}

function Deck({ cards }: Props) {
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

import fs from 'fs';
import path from 'path';
import { Box, Container } from '@chakra-ui/react';
import { parse } from 'csv-parse/sync';
import { useState } from 'react';
import { FlashCard } from '@/features/deck/components/FlashCard';
import { FlashCardActionButton } from '@/features/deck/components/FlashCardActionButton';
import { type FlashCardData } from '@/features/deck/interfaces';

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

  const handleShowAnswer = () => {
    setIsAnswerShown(true);
  };

  const handleDifficulty = () => {
    setIsAnswerShown(false);
    setCurrentCardIndex(currentCardIndex + 1);
  };

  if (currentCardIndex >= cards.length) {
    return <div>Finished</div>;
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

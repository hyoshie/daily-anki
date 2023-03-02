import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Container,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'

const cards = [
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
]

function Deck() {
  const [isAnswerShown, setIsAnswerShown] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  const handleShowAnswer = () => {
    setIsAnswerShown(true)
  }

  const handleDifficulty = () => {
    setIsAnswerShown(false)
    setCurrentCardIndex(currentCardIndex + 1)
  }

  const renderActionButtons = () => {
    if (isAnswerShown) {
      return (
        <ButtonGroup>
          <Button onClick={handleDifficulty}>Easy</Button>
          <Button onClick={handleDifficulty}>Hard</Button>
        </ButtonGroup>
      )
    } else {
      return <Button onClick={handleShowAnswer}>Show Answer</Button>
    }
  }

  if (currentCardIndex >= cards.length) {
    return <div>Finished</div>
  }

  return (
    <Container maxW='xl' mt='16' centerContent>
      <Card>
        <CardBody>
          <Stack divider={<StackDivider />}>
            <Text fontSize='2xl'>{cards[currentCardIndex].question}</Text>
            {isAnswerShown && <Text fontSize='lg'>{cards[currentCardIndex].answer}</Text>}
          </Stack>
        </CardBody>
      </Card>

      <Box textAlign='center' justifyContent='center' position='fixed' bottom='20px'>
        {renderActionButtons()}
      </Box>
    </Container>
  )
}

export default Deck

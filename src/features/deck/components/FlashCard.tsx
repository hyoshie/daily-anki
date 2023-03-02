import { Card, CardBody, Stack, StackDivider, Text } from '@chakra-ui/react'
import { type FlashCardData } from '../interfaces'

interface Props {
  card: FlashCardData
  isAnswerShown: boolean
}

export const FlashCard = ({ card, isAnswerShown }: Props) => {
  return (
    <Card>
      <CardBody>
        <Stack divider={<StackDivider />}>
          <Text fontSize='2xl'>{card.question}</Text>
          {isAnswerShown && <Text fontSize='lg'>{card.answer}</Text>}
        </Stack>
      </CardBody>
    </Card>
  )
}

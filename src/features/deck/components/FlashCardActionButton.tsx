import { Button, ButtonGroup } from '@chakra-ui/react'
import React from 'react'

interface Props {
  isAnswerShown: boolean
  handleShowAnswer: () => void
  handleDifficulty: () => void
}

export const FlashCardActionButton = ({
  isAnswerShown,
  handleShowAnswer,
  handleDifficulty,
}: Props) => {
  return isAnswerShown ? (
    <ButtonGroup>
      <Button onClick={handleDifficulty}>Easy</Button>
      <Button onClick={handleDifficulty}>Hard</Button>
    </ButtonGroup>
  ) : (
    <Button onClick={handleShowAnswer}>Show Answer</Button>
  )
}

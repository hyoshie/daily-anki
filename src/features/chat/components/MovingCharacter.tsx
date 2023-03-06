import { Box, keyframes, Image, Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const imageUrl =
  'https://3.bp.blogspot.com/-w3kGKyOYGGA/Ufj1Idjnn5I/AAAAAAAAWm0/zYE1bTDOJmI/s800/samurai.png';

const animationKeyframes = keyframes`
0% { transform: translate(0, 0) rotate(0deg); }
10% { transform: translate(-10px, 0) rotate(-5deg); }
20% { transform: translate(10px, 0) rotate(5deg); }
30% { transform: translate(-10px, 0) rotate(-5deg); }
40% { transform: translate(10px, 0) rotate(5deg); }
50% { transform: translate(-10px, 0) rotate(-5deg); }
60% { transform: translate(10px, 0) rotate(5deg); }
70% { transform: translate(-10px, 0) rotate(-5deg); }
80% { transform: translate(10px, 0) rotate(5deg); }
90% { transform: translate(-10px, 0) rotate(-5deg); }
100% { transform: translate(0, 0) rotate(0deg); }
`;

const animation = `${animationKeyframes} 2s ease-in-out`;

export const MovingCharacter = () => {
  const [isShaking, setIsShaking] = useState(false);

  const handleImageClick = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 1500);
  };

  return (
    <Box
      as={motion.div}
      animation={isShaking ? animation : ''}
      boxSize='100'
      onClick={handleImageClick}
    >
      <Center>
        <Image src={imageUrl} alt='samurai' />
      </Center>
    </Box>
  );
};

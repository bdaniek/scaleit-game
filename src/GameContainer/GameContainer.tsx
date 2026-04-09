import {
  Wrapper,
  OptionsContainer,
  DifficultyOption,
  Title,
  DifficultyPill,
  DifficultyName,
  DifficultyDesc,
} from './GameContainer.styles.ts';
import { useState } from 'react';
import GameMenu from '@/GameMenu/GameMenu.tsx';

const GameContainer = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const handleStartGame = () => {
    setHasGameStarted(true);
    setIsOpened(false);
  };
  return (
    <Wrapper isOpened={isOpened} hasGameStarted={hasGameStarted}>
      <GameMenu isOpened={isOpened} handleOpen={() => setIsOpened((prev) => !prev)} />
      <OptionsContainer hasGameStarted={hasGameStarted} isOpened={isOpened}>
        <Title>Difficulty</Title>
        <DifficultyOption isChosen onClick={handleStartGame}>
          <div>
            <DifficultyName>Easy</DifficultyName>
            <DifficultyDesc>Relaxed timing</DifficultyDesc>
          </div>
          <DifficultyPill>Chill</DifficultyPill>
        </DifficultyOption>

        <DifficultyOption isHard isChosen={false}>
          <div>
            <DifficultyName isHard>Hard</DifficultyName>
            <DifficultyDesc>No mercy</DifficultyDesc>
          </div>
          <DifficultyPill isHard>Intense</DifficultyPill>
        </DifficultyOption>
      </OptionsContainer>
    </Wrapper>
  );
};

export default GameContainer;

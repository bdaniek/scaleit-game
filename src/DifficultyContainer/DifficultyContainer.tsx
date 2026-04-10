import {
  OptionsContainer,
  DifficultyOption,
  DifficultyPill,
  DifficultyName,
  DifficultyDesc,
  Title,
} from '@/DifficultyContainer/DifficultyContainer.styles.ts';

interface DifficultyContainerProps {
  hasTimerStarted: boolean;
  isDifficultyOpened: boolean;
  handleStartGame: () => void;
}

const DifficultyContainer = ({
  hasTimerStarted,
  isDifficultyOpened,
  handleStartGame,
}: DifficultyContainerProps) => {
  return (
    <OptionsContainer hasTimerStarted={hasTimerStarted} isOpened={isDifficultyOpened}>
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
  );
};
export default DifficultyContainer;

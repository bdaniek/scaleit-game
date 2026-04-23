import {
  Wrapper,
  GameModeDesc,
  GameModeName,
  GameModeOption,
  Title,
} from '@/DifficultyContainer/GameMode.styles.ts';

interface GameModeProps {
  isDifficultyOpened: boolean;
  hasGameStarted: boolean;
  instant?: boolean;
  onNormalStart: () => void;
  onDailyStart: () => void;
}

const GameMode = ({ isDifficultyOpened, hasGameStarted, instant, onNormalStart, onDailyStart }: GameModeProps) => {
  return (
    <Wrapper hasGameStarted={hasGameStarted} isOpened={isDifficultyOpened} instant={instant}>
      <Title>Game mode</Title>

      <GameModeOption onClick={onNormalStart}>
        <div>
          <GameModeName>Normal</GameModeName>
          <GameModeDesc>Play freely, anytime, as many times as you want.</GameModeDesc>
        </div>
      </GameModeOption>

      <GameModeOption isHard onClick={onDailyStart}>
        <div>
          <GameModeName isHard>Daily</GameModeName>
          <GameModeDesc>One attempt per day. Compete with everyone for the best score.</GameModeDesc>
        </div>
      </GameModeOption>
    </Wrapper>
  );
};

export default GameMode;

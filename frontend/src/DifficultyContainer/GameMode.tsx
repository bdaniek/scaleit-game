import { GameModeDesc, GameModeName, GameModeOption, Title, Wrapper, } from '@/DifficultyContainer/GameMode.styles.ts';
import AnimatedContent from '@/AnimatedContent';

interface GameModeProps {
  isDifficultyOpened: boolean;
  hasGameStarted: boolean;
  instant?: boolean;
  onNormalStart: () => void;
  onDailyStart: () => void;
}

const GameMode = ({ isDifficultyOpened, hasGameStarted, instant, onNormalStart, onDailyStart }: GameModeProps) => {
  return (
    <AnimatedContent
      distance={70}
      direction="horizontal"
      reverse
      duration={0.7}
      ease="bounce.out"
      initialOpacity={0}
      animateOpacity
      scale={0.7}
      threshold={0.4}
      delay={0}
      trigger={isDifficultyOpened}
      style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '100%' }}
    >
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
    </AnimatedContent>
  );
};

export default GameMode;

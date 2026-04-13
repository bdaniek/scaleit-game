import GameMenu from '@/GameMenu/GameMenu';
import { useEffect, useState } from 'react';
import { Wrapper } from './GameContainer.styles';
import { useCountdown } from '@/hooks/useCountdown';
import DifficultyContainer from '@/DifficultyContainer/DifficultyContainer';
import GamePanel from '@/GamePanel/GamePanel';
import { useGame } from '@/hooks/useGame';
import RoundWatcher from '@/RoundWatcher/RoundWatcher';

const GameContainer = () => {
  const [isDifficultyOpened, setIsDifficultyOpened] = useState(false);

  const {
    phase,
    round,
    targetSize,
    shapeSize,
    results,
    setShapeSize,
    startGame,
    submitGuess,
    startCountdown,
  } = useGame();

  const hasGameStarted = ['countdown', 'memorize', 'recall', 'result', 'finished'].includes(phase);

  const handleChangeShapeSize = (_: Event, value: number | number[]) => {
    setShapeSize(value as number);
  };

  const countdown = useCountdown({
    start: phase === 'countdown',
    from: 3,
    delay: 1000,
    onFinish: () => {
      startGame();
    },
  });

  const handleStartGame = () => {
    startCountdown();
    setIsDifficultyOpened(false);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <Wrapper isOpened={isDifficultyOpened} hasGameStarted={hasGameStarted}>
      <GameMenu
        hasGameStarted={hasGameStarted}
        isOpened={isDifficultyOpened}
        handleOpen={() => setIsDifficultyOpened((prev) => !prev)}
      />
      <DifficultyContainer
        handleStartGame={handleStartGame}
        isDifficultyOpened={isDifficultyOpened}
        hasGameStarted={hasGameStarted}
      />
      <GamePanel
        shapeSize={shapeSize}
        handleChangeShapeSize={handleChangeShapeSize}
        phase={phase}
        targetSize={targetSize}
        submitGuess={submitGuess}
        countdown={countdown}
        hasGameStarted={hasGameStarted}
        round={round}
        results={results}
      />
      <RoundWatcher hasGameStarted={hasGameStarted} round={round} />
    </Wrapper>
  );
};

export default GameContainer;

import GameMenu from '@/GameMenu/GameMenu';
import { useEffect, useState } from 'react';
import { Wrapper } from './GameContainer.styles';
import { useCountdown } from '@/hooks/useCountdown.tsx';
import DifficultyContainer from '@/DifficultyContainer/DifficultyContainer.tsx';
import GamePanel from '@/GamePanel/GamePanel';

const GameContainer = () => {
  // this will change to objects with isOpen property, so Diff, Settings and Credits can open simultaneously
  const [isDifficultyOpened, setIsDifficultyOpened] = useState(false);

  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [hasTimerStarted, setHasTimerStarted] = useState(false);
  const [shapeSize, setShapeSize] = useState(100);

  const phase: 'idle' | 'countdown' | 'playing' = !hasTimerStarted
    ? 'idle'
    : !hasGameStarted
      ? 'countdown'
      : 'playing';

  const countdown = useCountdown({
    start: hasTimerStarted,
    from: 3,
    delay: 1000,
    onFinish: () => setHasGameStarted(true),
  });

  const handleStartGame = () => {
    setHasTimerStarted(true);
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

  const handleChangeShapeSize = (_: Event, value: number | number[]) => {
    setShapeSize(value as number);
  };

  return (
    <Wrapper
      isOpened={isDifficultyOpened}
      hasTimerStarted={hasTimerStarted}
      hasGameStarted={hasGameStarted}
    >
      <GameMenu
        hasTimerStarted={hasTimerStarted}
        isOpened={isDifficultyOpened}
        handleOpen={() => setIsDifficultyOpened((prev) => !prev)}
      />
      <DifficultyContainer
        handleStartGame={handleStartGame}
        isDifficultyOpened={isDifficultyOpened}
        hasTimerStarted={hasTimerStarted}
      />
      <GamePanel
        shapeSize={shapeSize}
        handleChangeShapeSize={handleChangeShapeSize}
        phase={phase}
        countdown={countdown}
        hasTimerStarted={hasTimerStarted}
        hasGameStarted={hasGameStarted}
      />
    </Wrapper>
  );
};

export default GameContainer;

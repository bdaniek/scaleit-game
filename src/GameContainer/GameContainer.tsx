import GameMenu from '@/GameMenu/GameMenu';
import { useEffect, useState } from 'react';
import { Wrapper, Bubble, GameScreen, RippleRing, Countdown } from './GameContainer.styles';
import { useCountdown } from '@/hooks/useCountdown.tsx';
import DifficultyContainer from '@/DifficultyContainer/DifficultyContainer.tsx';

const GameContainer = () => {
  // this will change to objects with isOpen property, so Diff, Settings and Credits can open simultaneously
  const [isDifficultyOpened, setIsDifficultyOpened] = useState(false);

  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [hasTimerStarted, setHasTimerStarted] = useState(false);
  const [rings, setRings] = useState<number[]>([]);

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

  const handleBubbleClick = () => {
    setRings((prev) => [...prev, Date.now()]);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        handleBubbleClick();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const removeRing = (id: number) => {
    setRings((prev) => prev.filter((r) => r !== id));
  };

  return (
    <Wrapper isOpened={isDifficultyOpened} hasTimerStarted={hasTimerStarted}>
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
      <GameScreen hasTimerStarted={hasTimerStarted}>
        {phase === 'playing' && <Bubble onClick={handleBubbleClick} />}
        {phase === 'playing' &&
          rings.map((id) => <RippleRing key={id} onAnimationEnd={() => removeRing(id)} />)}
        {countdown && phase === 'countdown' && <Countdown key={countdown}>{countdown}</Countdown>}
      </GameScreen>
    </Wrapper>
  );
};

export default GameContainer;

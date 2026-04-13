import {
  Wrapper,
  GameScreen,
  Bubble,
  Countdown,
  SliderWrapper,
  SubmitButton,
  Counter,
  ResultScreen,
  Title,
  RoundResultItem,
} from './GamePanel.styles.ts';
import Slider from '@mui/material/Slider';
import { useCountdown } from '@/hooks/useCountdown.tsx';
import { MEMORIZE_DURATION, type RoundResult } from '@/hooks/useGame.tsx';

interface GameScreenProps {
  shapeSize: number;
  handleChangeShapeSize: (event: Event, size: number) => void;
  phase: string;
  countdown: number | null;
  hasGameStarted: boolean;
  targetSize: number;
  submitGuess: () => void;
  round: number;
  results: RoundResult[];
}

const GamePanel = ({
  shapeSize,
  handleChangeShapeSize,
  phase,
  countdown,
  hasGameStarted,
  targetSize,
  submitGuess,
  results,
}: GameScreenProps) => {
  const counter = useCountdown({
    start: phase === 'memorize',
    from: MEMORIZE_DURATION / 1000,
    decimals: true,
  });

  return (
    <>
      <Wrapper hasGameStarted={hasGameStarted}>
        <GameScreen>
          {countdown && phase === 'countdown' && <Countdown key={countdown}>{countdown}</Countdown>}

          {phase === 'memorize' && <Bubble shapeSize={targetSize} />}
          {phase === 'recall' && <Bubble shapeSize={shapeSize} />}
          {phase === 'result' && (
            <>
              <Bubble shapeSize={targetSize} ghost />
              <Bubble
                shapeSize={shapeSize < targetSize ? shapeSize : targetSize}
                overflow={shapeSize > targetSize ? shapeSize - targetSize : 0}
              >
                {shapeSize > targetSize ? 'target' : 'yours'}
              </Bubble>
            </>
          )}

          {phase === 'finished' && (
            <ResultScreen>
              <Title>Results</Title>
              {results.map(({ target, diff }, key) => {
                const diffPercent = Math.max(0, (1 - diff / target) * 100);
                return (
                  <RoundResultItem key={key}>
                    {key + 1}. {diffPercent.toFixed(1)}% accuracy
                  </RoundResultItem>
                );
              })}
            </ResultScreen>
          )}
        </GameScreen>
      </Wrapper>
      <SliderWrapper isPlaying={['idle', 'countdown', 'memorize', 'finished'].includes(phase)}>
        <Slider
          orientation="vertical"
          min={30}
          max={300}
          defaultValue={30}
          sx={{ height: '90%', color: '#7c6af5' }}
          value={shapeSize}
          onChange={handleChangeShapeSize}
        />
      </SliderWrapper>
      {phase === 'recall' && <SubmitButton onClick={submitGuess}>Lock in</SubmitButton>}
      {phase === 'memorize' && <Counter>{counter}</Counter>}
    </>
  );
};

export default GamePanel;

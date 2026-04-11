import { Wrapper, GameScreen, Bubble, Countdown, SliderWrapper } from './GamePanel.styles.ts';
import Slider from '@mui/material/Slider';

interface GameScreenProps {
  shapeSize: number;
  handleChangeShapeSize: (event: Event, size: number) => void;
  phase: string;
  countdown: number | null;
  hasTimerStarted: boolean;
  hasGameStarted: boolean;
}

const GamePanel = ({
  shapeSize,
  handleChangeShapeSize,
  phase,
  countdown,
  hasTimerStarted,
  hasGameStarted,
}: GameScreenProps) => {
  return (
    <>
      <Wrapper hasGameStarted={hasGameStarted} hasTimerStarted={hasTimerStarted}>
        <GameScreen>
          {countdown && phase === 'countdown' && <Countdown key={countdown}>{countdown}</Countdown>}
          {phase === 'playing' && <Bubble shapeSize={shapeSize} />}
        </GameScreen>
      </Wrapper>
      <SliderWrapper hasGameStarted={hasGameStarted}>
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
    </>
  );
};

export default GamePanel;

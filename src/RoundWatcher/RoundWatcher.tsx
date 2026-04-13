import { Wrapper } from './RoundWatcher.styles.ts';
import CircleIcon from '@mui/icons-material/Circle';
import AdjustIcon from '@mui/icons-material/Adjust';
import { ROUNDS } from '@/hooks/useGame.tsx';

interface RoundWatcherProps {
  round: number;
  hasGameStarted: boolean;
}

const roundArr = Array.from({ length: ROUNDS }, (_, i) => i + 1);

const RoundWatcher = ({ round, hasGameStarted }: RoundWatcherProps) => {
  return (
    <Wrapper hasGameStarted={hasGameStarted}>
      {roundArr.map((number, key) =>
        number === round ? <CircleIcon key={key} /> : <AdjustIcon key={key} />,
      )}
    </Wrapper>
  );
};

export default RoundWatcher;

import { Wrapper } from '@/RoundWatcher/RoundWatcher.styles.ts';
import CircleIcon from '@mui/icons-material/Circle';
import AdjustIcon from '@mui/icons-material/Adjust';

interface RoundWatcherProps {
  round: number;
  totalRounds: number;
  hasGameStarted: boolean;
}

const RoundWatcher = ({ round, totalRounds, hasGameStarted }: RoundWatcherProps) => {
  const roundArr = Array.from({ length: totalRounds }, (_, i) => i + 1);

  return (
    <Wrapper hasGameStarted={hasGameStarted}>
      {roundArr.map((number, key) =>
        number === round ? <CircleIcon key={key} /> : <AdjustIcon key={key} />,
      )}
    </Wrapper>
  );
};

export default RoundWatcher;

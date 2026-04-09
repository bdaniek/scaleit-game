import { Wrapper, GameMenuOptions, GameMenuOption, ArrowSpan } from './GameMenu.styles.ts';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
interface MenuProps {
  isOpened: boolean;
  handleOpen: () => void;
}

const GameMenu = ({ isOpened, handleOpen }: MenuProps) => {
  return (
    <Wrapper isOpened={isOpened}>
      <GameMenuOptions>
        <GameMenuOption onClick={handleOpen}>
          <ArrowSpan>
            <FiberManualRecordIcon fontSize="small" />
          </ArrowSpan>
          Start
        </GameMenuOption>
      </GameMenuOptions>
    </Wrapper>
  );
};

export default GameMenu;

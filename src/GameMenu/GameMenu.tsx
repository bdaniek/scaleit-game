import { Wrapper, GameMenuOptions, GameMenuOption, ArrowSpan } from './GameMenu.styles.ts';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface MenuProps {
  isOpened: boolean;
  handleOpen: () => void;
  hasTimerStarted: boolean;
}

const menuOptions = ['Start', 'Settings', 'Credits'];

const GameMenu = ({ isOpened, handleOpen, hasTimerStarted }: MenuProps) => {
  return (
    <Wrapper hasTimerStarted={hasTimerStarted} isOpened={isOpened}>
      <GameMenuOptions hasTimerStarted={hasTimerStarted}>
        {menuOptions.map((option) => (
          <GameMenuOption key={option} onClick={handleOpen}>
            <ArrowSpan>
              <KeyboardArrowRightIcon />
            </ArrowSpan>
            {option}
          </GameMenuOption>
        ))}
      </GameMenuOptions>
    </Wrapper>
  );
};

export default GameMenu;

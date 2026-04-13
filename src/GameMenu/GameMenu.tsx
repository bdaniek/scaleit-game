import { Wrapper, GameMenuOptions, GameMenuOption, ArrowSpan } from './GameMenu.styles.ts';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface MenuProps {
  isOpened: boolean;
  handleOpen: () => void;
  hasGameStarted: boolean;
}

const menuOptions = ['Start', 'Settings', 'Credits'];

const GameMenu = ({ isOpened, handleOpen, hasGameStarted }: MenuProps) => {
  return (
    <Wrapper hasGameStarted={hasGameStarted} isOpened={isOpened}>
      <GameMenuOptions hasGameStarted={hasGameStarted}>
        {menuOptions.map((option) => (
          <GameMenuOption hasGameStarted={hasGameStarted} key={option} onClick={handleOpen}>
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

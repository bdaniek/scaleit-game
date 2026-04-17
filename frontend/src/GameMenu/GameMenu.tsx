import {
  Wrapper,
  TopSection,
  GameTitle,
  GameTagline,
  Divider,
  RulesList,
  RuleItem,
  RuleNumber,
  RuleText,
  PlayButton,
} from '@/GameMenu/GameMenu.styles.ts';
import EastIcon from '@mui/icons-material/East';

interface MenuProps {
  isOpened: boolean;
  handleOpen: () => void;
  hasGameStarted: boolean;
}

const rules = [
  'A bubble appears on screen for one second.',
  'It disappears — drag the slider to match its size.',
  'Your accuracy determines your score.',
];

const GameMenu = ({ isOpened, handleOpen, hasGameStarted }: MenuProps) => {
  return (
    <Wrapper hasGameStarted={hasGameStarted} isOpened={isOpened}>
      <div>
        <TopSection>
          <GameTitle>ScaleIt</GameTitle>
          <GameTagline>how well do you remember size?</GameTagline>
        </TopSection>

        <Divider />

        <RulesList>
          {rules.map((rule, i) => (
            <RuleItem key={i}>
              <RuleNumber>{i + 1}</RuleNumber>
              <RuleText>{rule}</RuleText>
            </RuleItem>
          ))}
        </RulesList>
      </div>

      <PlayButton onClick={handleOpen}>
        pick a mode <EastIcon style={{ fontSize: 16 }} />
      </PlayButton>
    </Wrapper>
  );
};

export default GameMenu;

import {
  Divider,
  GameTagline,
  GameTitle,
  PlayButton,
  RuleItem,
  RuleNumber,
  RulesList,
  RuleText,
  TopSection,
  Wrapper,
} from '@/GameMenu/GameMenu.styles.ts';
import EastIcon from '@mui/icons-material/East';
import AnimatedContent from '@/AnimatedContent';

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
    <AnimatedContent
      distance={100}
      direction="vertical"
      reverse={false}
      duration={1.5}
      ease="elastic.out(1, 0.3)"
      initialOpacity={0}
      animateOpacity
      scale={0.6}
      threshold={0.2}
      delay={0}
      style={{ height: '100%', position: 'relative', zIndex: 99 }}
    >
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

        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={1.5}
          ease="elastic.out(1, 0.3)"
          initialOpacity={0}
          animateOpacity
          scale={0.6}
          threshold={0.2}
          delay={0.3}
        >
          <PlayButton onClick={handleOpen}>
            pick a mode <EastIcon style={{ fontSize: 16 }} />
          </PlayButton>
        </AnimatedContent>
      </Wrapper>
    </AnimatedContent>
  );
};

export default GameMenu;

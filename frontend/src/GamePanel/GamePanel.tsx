import React, { useEffect, useRef, useState } from 'react';
import {
  BarFill,
  BarTrack,
  BarValue,
  Countdown,
  Counter,
  FinishButton,
  FloatingToast,
  GameScreen,
  HintText,
  LeaderboardItem,
  LeaderboardList,
  LegendDot,
  ResultAccuracy,
  ResultLegend,
  ResultScreen,
  RoundBars,
  RoundLabel,
  RoundResultItem,
  ScoreDenom,
  ScoreNumber,
  ScoreRow,
  ShareButton,
  ShareCard,
  ShareCopyButton,
  ShareForm,
  ShareInput,
  ShareRank,
  SliderHint,
  SliderWrapper,
  SubmitButton,
  VerdictText,
  Wrapper,
} from '@/GamePanel/GamePanel.styles.ts';
import SplitText from '@/SplitText';
import GameShape from '@/GamePanel/GameShape';
import type { ShapeType } from '@/GamePanel/shapes';
import Slider from '@mui/material/Slider';
import { useCountdown } from '@/hooks/useCountdown.tsx';
import { MEMORIZE_DURATION, type RoundResult } from '@/hooks/useGame.tsx';
import type { DailyStatus } from '@/hooks/useDailyChallenge';
import type { LeaderboardResponse, SubmitScoreResponse } from '@/api/client';

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
  handleFinishGame: () => void;
  shape: ShapeType;
  color: string;
  // Daily-specific
  isDaily: boolean;
  dailyStatus: DailyStatus;
  submitResult: SubmitScoreResponse | null;
  leaderboard: LeaderboardResponse | null;
  onShareScore: (playerName: string) => void;
}

const GamePanel = ({
  shapeSize,
  handleChangeShapeSize,
  phase,
  countdown,
  hasGameStarted,
  targetSize,
  submitGuess,
  round,
  results,
  handleFinishGame,
  shape,
  color,
  isDaily,
  dailyStatus,
  submitResult,
  leaderboard,
  onShareScore,
}: GameScreenProps) => {
  const [playerName, setPlayerName] = useState('');
  const [copied, setCopied] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hidingHint, setHidingHint] = useState(false);
  const [floatMessage, setFloatMessage] = useState('');
  const [toastKey, setToastKey] = useState(0);
  const hintSeenRef = useRef(false);
  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismissHint = () => {
    if (!showHint) return;
    setHidingHint(true);
    hintTimerRef.current = setTimeout(() => {
      setShowHint(false);
      setHidingHint(false);
    }, 350);
  };

  useEffect(() => {
    if (phase === 'recall' && round === 1 && !hintSeenRef.current) {
      hintSeenRef.current = true;
      setShowHint(true);
      hintTimerRef.current = setTimeout(dismissHint, 3000);
    }
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, round]);

  const counter = useCountdown({
    start: phase === 'memorize',
    from: MEMORIZE_DURATION / 1000,
    decimals: true,
    round,
  });

  const getRoundQuip = (pct: number) => {
    if (pct >= 95) return 'Genius or what? 🧠';
    if (pct >= 85) return 'You are a pro. Period. 👀';
    if (pct >= 75) return 'Not bad... I guess.';
    if (pct >= 65) return 'Could be worse. Barely.';
    if (pct >= 50) return 'My grandma does better...';
    if (pct >= 40) return 'Bruhhh, seriously? 💀';
    if (pct >= 25) return 'Are you even looking?';
    return 'Stevie Wonder is that you? 🕶️';
  };

  useEffect(() => {
    if (phase === 'result') {
      const pct = Math.max(0, (1 - Math.abs(targetSize - shapeSize) / targetSize) * 100);
      setFloatMessage(getRoundQuip(pct));
      setToastKey((k) => k + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const finalResult =
    results.reduce((sum, r) => {
      return sum + Math.max(0, (1 - r.diff / r.target) * 100);
    }, 0) / (results.length || 1);

  const handleCopyShare = () => {
    if (!submitResult) return;
    const text = `I scored ${finalResult.toFixed(1)}/100 on Glimpse Daily (${submitResult.date})!\nRank #${submitResult.rank} — can you beat me? Play at ${window.location.origin}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSubmitShare = () => {
    if (playerName.trim().length === 0) return;
    onShareScore(playerName.trim());
  };

  const isFinished = phase === 'finished';

  const getVerdict = (score: number) => {
    if (score >= 90) return 'Flawless! 🎯';
    if (score >= 75) return 'Impressive! 🔥';
    if (score >= 60) return 'Pretty good! 👌';
    if (score >= 40) return 'Keep at it 💪';
    return 'Bummer... 😅';
  };
  const showShareForm =
    isDaily && isFinished && (dailyStatus === 'ready' || dailyStatus === 'error');
  const showSubmitting = isDaily && isFinished && dailyStatus === 'submitting';
  const showSubmitted = isDaily && isFinished && dailyStatus === 'submitted';

  return (
    <>
      <Wrapper hasGameStarted={hasGameStarted}>
        <GameScreen isSliderVisible={['idle', 'countdown', 'memorize', 'finished'].includes(phase)}>
          {countdown && phase === 'countdown' && <Countdown key={countdown}>{countdown}</Countdown>}

          {phase === 'memorize' && (
            <GameShape shape={shape} size={targetSize} color={color} variant="bubble" />
          )}

          {phase === 'recall' && (
            <GameShape shape={shape} size={shapeSize} color={color} variant="bubble" />
          )}

          {phase === 'result' &&
            (() => {
              const roundAccuracy = Math.max(
                0,
                (1 - Math.abs(targetSize - shapeSize) / targetSize) * 100,
              );
              const isOvershot = shapeSize > targetSize;
              return (
                <>
                  <ResultAccuracy>{roundAccuracy.toFixed(1)}%</ResultAccuracy>
                  <GameShape
                    shape={shape}
                    size={shapeSize}
                    color={color}
                    variant="guess"
                    isOvershot={isOvershot}
                  />
                  <GameShape shape={shape} size={targetSize} color={color} variant="ring" />
                  <ResultLegend>
                    <LegendDot dashed>target</LegendDot>
                    <LegendDot style={{ '--dot-color': color } as React.CSSProperties}>
                      yours
                    </LegendDot>
                  </ResultLegend>
                </>
              );
            })()}

          {phase === 'result' && floatMessage && (
            <FloatingToast key={toastKey}>{floatMessage}</FloatingToast>
          )}

          {isFinished && (
            <ResultScreen>
              <VerdictText>
                <SplitText
                  text={getVerdict(finalResult)}
                  ease="bounce.out"
                  duration={0.8}
                  stagger={0.04}
                  delay={0.1}
                />
              </VerdictText>

              <ScoreRow>
                <ScoreNumber>
                  <SplitText
                    text={finalResult.toFixed(1)}
                    ease="elastic.out(1,0.5)"
                    duration={0.9}
                    stagger={0.06}
                    delay={0.35}
                    from={{ y: 20, opacity: 0 }}
                  />
                </ScoreNumber>
                <ScoreDenom>/100</ScoreDenom>
              </ScoreRow>

              <RoundBars>
                {results.map(({ target, diff }, key) => {
                  const pct = Math.max(0, (1 - diff / target) * 100);
                  const barDelay = 550 + key * 80;
                  return (
                    <RoundResultItem key={key} delay={500 + key * 80}>
                      <RoundLabel>{key + 1}</RoundLabel>
                      <BarTrack>
                        <BarFill pct={pct} delay={barDelay} />
                      </BarTrack>
                      <BarValue>{pct.toFixed(1)}%</BarValue>
                    </RoundResultItem>
                  );
                })}
              </RoundBars>

              {/* Daily: name input before sharing */}
              {showShareForm && (
                <ShareForm>
                  {dailyStatus === 'error' && (
                    <div style={{ fontSize: 12, color: '#c95f67', marginBottom: 4 }}>
                      Submit failed — try again
                    </div>
                  )}
                  <ShareInput
                    placeholder="Your name"
                    maxLength={30}
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmitShare()}
                  />
                  <ShareButton onClick={handleSubmitShare} disabled={!playerName.trim()}>
                    Share score
                  </ShareButton>
                  <span
                    onClick={handleFinishGame}
                    style={{ fontSize: 12, color: '#b0aad8', cursor: 'pointer', marginTop: 2 }}
                  >
                    skip
                  </span>
                </ShareForm>
              )}

              {/* Daily: submitting */}
              {showSubmitting && (
                <ShareForm>
                  <ShareButton disabled>Submitting…</ShareButton>
                </ShareForm>
              )}

              {/* Daily: submitted — show rank + leaderboard */}
              {showSubmitted && submitResult && (
                <ShareCard>
                  <ShareRank>
                    #{submitResult.rank} today
                    {leaderboard ? ` out of ${leaderboard.total}` : ''}
                  </ShareRank>
                  <ShareCopyButton onClick={handleCopyShare}>
                    {copied ? 'Copied!' : 'Copy share text'}
                  </ShareCopyButton>
                  {leaderboard && leaderboard.scores.length > 0 && (
                    <LeaderboardList>
                      <div
                        style={{
                          fontSize: 11,
                          color: '#9b96c0',
                          marginBottom: 4,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        Leaderboard
                      </div>
                      {leaderboard.scores.slice(0, 5).map((s, i) => (
                        <LeaderboardItem key={s.shareId} isMe={s.shareId === submitResult.shareId}>
                          <span>
                            #{i + 1} {s.playerName}
                          </span>
                          <span>{s.score.toFixed(1)}</span>
                        </LeaderboardItem>
                      ))}
                    </LeaderboardList>
                  )}
                </ShareCard>
              )}
            </ResultScreen>
          )}
        </GameScreen>
      </Wrapper>

      {showHint && (
        <SliderHint hiding={hidingHint}>
          <svg width="80" height="64" viewBox="0 0 80 64" fill="none">
            <path
              className="hint-path"
              d="M 18 60 C 18 28, 68 36, 74 8"
              stroke="rgba(45,27,110,0.65)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              className="hint-arrowhead"
              d="M 74 8 L 65 14 M 74 8 L 73 20"
              stroke="rgba(45,27,110,0.65)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <HintText>Use slider to adjust size</HintText>
        </SliderHint>
      )}

      <SliderWrapper
        isPlaying={['idle', 'countdown', 'memorize', 'finished'].includes(phase)}
        hasGameStarted={hasGameStarted}
      >
        <Slider
          orientation="vertical"
          min={20}
          max={300}
          defaultValue={30}
          sx={{ height: '90%' }}
          value={shapeSize}
          onChange={(e, v) => {
            dismissHint();
            handleChangeShapeSize(e, v as number);
          }}
          disabled={phase === 'result'}
        />
      </SliderWrapper>

      {phase === 'recall' && (
        <SubmitButton
          onClick={() => {
            dismissHint();
            submitGuess();
          }}
        >
          Next
        </SubmitButton>
      )}

      {/* Normal mode finish / daily finish after submit */}
      {isFinished && (!isDaily || showSubmitted) && (
        <FinishButton onClick={handleFinishGame}>Try again?</FinishButton>
      )}

      {phase === 'memorize' && <Counter>{counter}</Counter>}
    </>
  );
};

export default GamePanel;

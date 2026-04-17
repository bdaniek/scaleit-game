import { useState } from 'react';
import {
  Wrapper,
  GameScreen,
  Bubble,
  TargetRing,
  GuessBubble,
  ResultLegend,
  LegendDot,
  ResultAccuracy,
  Countdown,
  SliderWrapper,
  SubmitButton,
  Counter,
  ResultScreen,
  Title,
  RoundResultItem,
  FinalResult,
  FinishButton,
  ShareForm,
  ShareInput,
  ShareButton,
  ShareCard,
  ShareRank,
  ShareCopyButton,
  LeaderboardList,
  LeaderboardItem,
} from '@/GamePanel/GamePanel.styles.ts';
import Slider from '@mui/material/Slider';
import { useCountdown } from '@/hooks/useCountdown.tsx';
import { MEMORIZE_DURATION, type RoundResult } from '@/hooks/useGame.tsx';
import type { DailyStatus } from '@/hooks/useDailyChallenge';
import type { SubmitScoreResponse, LeaderboardResponse } from '@/api/client';

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
  isDaily,
  dailyStatus,
  submitResult,
  leaderboard,
  onShareScore,
}: GameScreenProps) => {
  const [playerName, setPlayerName] = useState('');
  const [copied, setCopied] = useState(false);

  const counter = useCountdown({
    start: phase === 'memorize',
    from: MEMORIZE_DURATION / 1000,
    decimals: true,
    round,
  });

  const finalResult =
    results.reduce((sum, r) => {
      return sum + Math.max(0, (1 - r.diff / r.target) * 100);
    }, 0) / (results.length || 1);

  const handleCopyShare = () => {
    if (!submitResult) return;
    const text = `I scored ${finalResult.toFixed(1)}/100 on ScaleIt Daily (${submitResult.date})!\nRank #${submitResult.rank} — can you beat me? Play at ${window.location.origin}`;
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
  // After playing daily, status is 'ready' (set when challenge loaded). 'error' = failed submit, allow retry.
  const showShareForm = isDaily && isFinished && (dailyStatus === 'ready' || dailyStatus === 'error');
  const showSubmitting = isDaily && isFinished && dailyStatus === 'submitting';
  const showSubmitted = isDaily && isFinished && dailyStatus === 'submitted';

  return (
    <>
      <Wrapper hasGameStarted={hasGameStarted}>
        <GameScreen>
          {countdown && phase === 'countdown' && <Countdown key={countdown}>{countdown}</Countdown>}

          {phase === 'memorize' && <Bubble shapeSize={targetSize} />}
          {phase === 'recall' && <Bubble shapeSize={shapeSize} />}
          {phase === 'result' && (() => {
            const roundAccuracy = Math.max(0, (1 - Math.abs(targetSize - shapeSize) / targetSize) * 100);
            const isOvershot = shapeSize > targetSize;
            return (
              <>
                <ResultAccuracy>{roundAccuracy.toFixed(1)}%</ResultAccuracy>
                <GuessBubble shapeSize={shapeSize} isOvershot={isOvershot} />
                <TargetRing shapeSize={targetSize} />
                <ResultLegend>
                  <LegendDot dashed>target</LegendDot>
                  <LegendDot >yours</LegendDot>
                </ResultLegend>
              </>
            );
          })()}

          {isFinished && (
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

              <FinalResult>{finalResult.toFixed(1)}/100</FinalResult>

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
                      <div style={{ fontSize: 11, color: '#9b96c0', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Leaderboard
                      </div>
                      {leaderboard.scores.slice(0, 5).map((s, i) => (
                        <LeaderboardItem key={s.shareId} isMe={s.shareId === submitResult.shareId}>
                          <span>#{i + 1} {s.playerName}</span>
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

      {hasGameStarted && (
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
      )}

      {phase === 'recall' && <SubmitButton onClick={submitGuess}>Lock in</SubmitButton>}

      {/* Normal mode finish / daily finish after submit */}
      {isFinished && (!isDaily || showSubmitted) && (
        <FinishButton onClick={handleFinishGame}>Play again</FinishButton>
      )}

      {phase === 'memorize' && <Counter>{counter}</Counter>}
    </>
  );
};

export default GamePanel;

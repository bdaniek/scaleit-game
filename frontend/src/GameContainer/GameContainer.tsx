import { useEffect, useRef, useState } from 'react';
import { useSetThemeColor } from '@/context/gameTheme';
import GameMenu from '@/GameMenu/GameMenu';
import { Wrapper, Overlay, OverlayButton, OverlayTitle, OverlayText} from '@/GameContainer/GameContainer.styles';
import { useCountdown } from '@/hooks/useCountdown';
import GameMode from '@/DifficultyContainer/GameMode.tsx';
import GamePanel from '@/GamePanel/GamePanel';
import { useGame } from '@/hooks/useGame';
import { useDailyChallenge } from '@/hooks/useDailyChallenge';
import RoundWatcher from '@/RoundWatcher/RoundWatcher';

type GameMode = 'normal' | 'daily' | null;

// ─── Component ───────────────────────────────────────────────────────────────

const GameContainer = () => {
  const [mode, setMode] = useState<GameMode>(null);
  const [isDifficultyOpened, setIsDifficultyOpened] = useState(false);

  const {
    phase,
    round,
    totalRounds,
    targetSize,
    shapeSize,
    shape,
    color,
    results,
    setShapeSize,
    startGame,
    submitGuess,
    startCountdown,
    handleFinishGame,
  } = useGame();

  const {
    status: dailyStatus,
    challenge,
    submitResult,
    leaderboard,
    error: dailyError,
    loadChallenge,
    submitScore,
    reset: resetDaily,
  } = useDailyChallenge();

  const hasGameStarted = ['countdown', 'memorize', 'recall', 'result', 'finished'].includes(phase);

  const handleChangeShapeSize = (_: Event, value: number | number[]) => {
    setShapeSize(value as number);
  };

  // ── Pending targets stored in a ref so useEffect doesn't cascade ────────
  const pendingTargetsRef = useRef<number[] | undefined>(undefined);

  const countdown = useCountdown({
    start: phase === 'countdown',
    from: 3,
    delay: 1000,
    onFinish: () => {
      startGame(pendingTargetsRef.current);
    },
  });

  // ── Normal mode ──────────────────────────────────────────────────────────
  const handleNormalStart = () => {
    setMode('normal');
    pendingTargetsRef.current = undefined;
    startCountdown();
    setIsDifficultyOpened(false);
  };

  // ── Daily mode ───────────────────────────────────────────────────────────
  const handleDailyStart = () => {
    setMode('daily');
    setIsDifficultyOpened(false);
    loadChallenge();
  };

  // When the challenge loads and the player hasn't played yet, kick off countdown
  useEffect(() => {
    if (mode === 'daily' && dailyStatus === 'ready' && challenge) {
      pendingTargetsRef.current = challenge.targets;
      startCountdown();
    }
  }, [mode, dailyStatus, challenge, startCountdown]);

  // ── Finish / reset ────────────────────────────────────────────────────────
  const handlePlayAgain = () => {
    handleFinishGame();
    resetDaily();
    setMode(null);
  };

  // ── Score submission (daily only) ────────────────────────────────────────
  const finalScore =
    results.length > 0
      ? results.reduce((sum, r) => sum + Math.max(0, (1 - r.diff / r.target) * 100), 0) /
        results.length
      : 0;

  const handleShareScore = (playerName: string) => {
    submitScore(finalScore, playerName);
  };

  // ── Sync game color into MUI theme ───────────────────────────────────────
  const setThemeColor = useSetThemeColor();
  useEffect(() => {
    setThemeColor(color);
  }, [color, setThemeColor]);

  // ── Space bar guard ───────────────────────────────────────────────────────
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) e.preventDefault();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // ── Daily overlay (loading / error / already-played) ─────────────────────
  const showDailyOverlay =
    mode === 'daily' &&
    (dailyStatus === 'loading' ||
      (dailyStatus === 'ready' && !hasGameStarted) ||
      dailyStatus === 'error' ||
      dailyStatus === 'already_played');

  return (
    <Wrapper isOpened={isDifficultyOpened} hasGameStarted={hasGameStarted || showDailyOverlay}>
      <GameMenu
        hasGameStarted={hasGameStarted || showDailyOverlay}
        isOpened={isDifficultyOpened}
        handleOpen={() => setIsDifficultyOpened((prev) => !prev)}
      />

      <GameMode
        onNormalStart={handleNormalStart}
        onDailyStart={handleDailyStart}
        isDifficultyOpened={isDifficultyOpened}
        hasGameStarted={hasGameStarted || showDailyOverlay}
        instant={mode === 'daily'}
      />

      {/* Daily-specific overlay states */}
      {showDailyOverlay && (
        <Overlay>
          {dailyStatus === 'loading' && (
            <>
              <OverlayTitle>Loading today's challenge…</OverlayTitle>
              <OverlayText>Fetching your targets from the server.</OverlayText>
            </>
          )}

          {dailyStatus === 'error' && (
            <>
              <OverlayTitle>Connection failed</OverlayTitle>
              <OverlayText>{dailyError}</OverlayText>
              <OverlayButton onClick={handlePlayAgain}>Go back</OverlayButton>
            </>
          )}

          {dailyStatus === 'already_played' && (
            <>
              <OverlayTitle>Already played today!</OverlayTitle>
              <OverlayText>
                You've used your daily attempt. Come back tomorrow for a new challenge.
              </OverlayText>
              {leaderboard && leaderboard.scores.length > 0 && (
                <div style={{ width: '100%', marginTop: 8 }}>
                  <OverlayText style={{ marginBottom: 6, fontWeight: 600 }}>
                    Today's leaderboard
                  </OverlayText>
                  {leaderboard.scores.slice(0, 5).map((s, i) => (
                    <div
                      key={s.shareId}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 13,
                        color: '#4e4880',
                        padding: '3px 0',
                        borderBottom: '1px solid #e3dff5',
                      }}
                    >
                      <span>#{i + 1} {s.playerName}</span>
                      <span style={{ fontWeight: 600 }}>{s.score.toFixed(1)} / 100</span>
                    </div>
                  ))}
                </div>
              )}
              <OverlayButton onClick={handlePlayAgain}>Go back</OverlayButton>
            </>
          )}
        </Overlay>
      )}

      {/* Main game panel */}
      <GamePanel
        shapeSize={shapeSize}
        handleChangeShapeSize={handleChangeShapeSize}
        phase={phase}
        targetSize={targetSize}
        submitGuess={submitGuess}
        countdown={countdown}
        hasGameStarted={hasGameStarted}
        round={round}
        results={results}
        handleFinishGame={handlePlayAgain}
        shape={shape}
        color={color}
        isDaily={mode === 'daily'}
        dailyStatus={dailyStatus}
        submitResult={submitResult}
        leaderboard={leaderboard}
        onShareScore={handleShareScore}
      />

      {hasGameStarted && (
        <RoundWatcher
          hasGameStarted={hasGameStarted}
          round={round}
          totalRounds={totalRounds}
        />
      )}
    </Wrapper>
  );
};

export default GameContainer;

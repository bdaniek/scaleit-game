import { keyframes, styled } from '@mui/material';

export const Wrapper = styled('div')<{ hasGameStarted: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 98;
  opacity: ${({ hasGameStarted }) => (hasGameStarted ? '1' : '0')};
  transition: all 300ms ease;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0eef8;
`;

export const SliderWrapper = styled('div')<{ isPlaying: boolean }>`
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d9d4ef;
  border-left: none;
  position: absolute;
  right: ${({ isPlaying }) => (isPlaying ? '0' : '-50px')};
  top: 0;
  z-index: 97;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  transition: all 300ms ease;
`;

export const GameScreen = styled('div')`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: calc(100% - 50px);
  border: 1px solid #d9d4ef;
  border-bottom-left-radius: 12px;
  border-top-left-radius: 12px;
  overflow: hidden;
  position: relative;
`;

// ─── Result phase overlays ────────────────────────────────────────────────────

export const ResultLegend = styled('div')`
  position: absolute;
  bottom: 14px;
  display: flex;
  gap: 16px;
  font-size: 12px;
  font-family: 'DM Sans', sans-serif;
  color: #9b96c0;
`;

export const LegendDot = styled('span')<{ dashed?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ dashed }) => (dashed ? 'transparent' : 'var(--dot-color, #7c6af5)')};
    opacity: ${({ dashed }) => (dashed ? 1 : 0.75)};
    border: ${({ dashed }) => (dashed ? '1.5px dashed rgba(78,72,128,0.6)' : 'none')};
  }
`;

export const ResultAccuracy = styled('div')`
  position: absolute;
  top: 14px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.primary.main};
  font-family: 'DM Sans', sans-serif;
  opacity: 0.8;
`;

// ─── Countdown ────────────────────────────────────────────────────────────────

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  30% {
    transform: scale(1.35);
    opacity: 1;
  }
  60% {
    transform: scale(0.95);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const Countdown = styled('div')`
  font-size: 40px;
  font-weight: 700;
  color: black;
  display: inline-block;
  animation: ${pulse} 250ms cubic-bezier(0.2, 0.9, 0.2, 1);
`;

// ─── Controls ─────────────────────────────────────────────────────────────────

export const SubmitButton = styled('div')`
  position: absolute;
  width: 180px;
  height: 40px;
  bottom: -40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.main};
  cursor: pointer;
  transition: all 200ms ease;

  &:hover {
    background: ${({ theme }) => theme.palette.primary.main};
    color: #fff;
    letter-spacing: 1px;
  }
`;

export const Counter = styled('div')`
  display: flex;
  padding: 8px 12px;
  align-items: center;
  font-weight: 700;
  font-size: 24px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  font-family: 'Courier New', Courier, monospace;
`;

// ─── Results screen ───────────────────────────────────────────────────────────

export const ResultScreen = styled('div')`
  width: 100%;
  height: 100%;
  z-index: 102;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
`;

export const Title = styled('div')`
  font-weight: 700;
  font-size: 20px;
`;

export const RoundResultItem = styled('div')``;

export const FinalResult = styled('div')`
  font-weight: 700;
  text-align: center;
  font-size: 30px;
`;

export const FinishButton = styled('div')`
  position: absolute;
  width: 180px;
  height: 40px;
  bottom: -40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.main};
  cursor: pointer;
  transition: all 200ms ease;

  &:hover {
    background: ${({ theme }) => theme.palette.primary.main};
    color: #fff;
  }
`;

// ─── Daily share UI ───────────────────────────────────────────────────────────

export const ShareForm = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  width: 100%;
`;

export const ShareInput = styled('input')`
  width: 100%;
  max-width: 200px;
  padding: 8px 12px;
  border: 1px solid #d9d4ef;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: #4e4880;
  background: #fff;
  outline: none;
  text-align: center;

  &:focus {
    border-color: ${({ theme }) => theme.palette.primary.main};
  }

  &::placeholder {
    color: #c0bce0;
  }
`;

export const ShareButton = styled('button')<{ disabled?: boolean }>`
  padding: 8px 20px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  background: ${({ disabled }) => (disabled ? 'rgba(0,0,0,0.06)' : 'transparent')};
  color: ${({ disabled, theme }) => (disabled ? '#b0aad8' : theme.palette.primary.main)};
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  transition: all 160ms ease;

  &:hover {
    background: ${({ disabled, theme }) => (disabled ? 'rgba(0,0,0,0.06)' : theme.palette.primary.main)};
    color: ${({ disabled }) => (disabled ? '#b0aad8' : '#fff')};
  }
`;

export const ShareCard = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  width: 100%;
`;

export const ShareRank = styled('div')`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const ShareCopyButton = styled('button')`
  padding: 6px 16px;
  border-radius: 8px;
  border: 1px solid #d9d4ef;
  background: transparent;
  color: #9b96c0;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  cursor: pointer;
  transition: all 160ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const LeaderboardList = styled('div')`
  width: 100%;
  max-width: 220px;
  margin-top: 4px;
`;

export const LeaderboardItem = styled('div')<{ isMe?: boolean }>`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 3px 0;
  border-bottom: 1px solid #e3dff5;
  color: ${({ isMe, theme }) => (isMe ? theme.palette.primary.main : '#4e4880')};
  font-weight: ${({ isMe }) => (isMe ? '600' : '400')};
`;

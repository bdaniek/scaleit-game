import { styled } from '@mui/material';

export const Wrapper = styled('div')<{
  isOpened: boolean;
  hasGameStarted: boolean;
}>`
  width: 300px;
  height: 100%;
  position: relative;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 28px 24px;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  background:
    radial-gradient(circle at 12% 88%, rgba(255, 255, 255, 0.11) 0%, transparent 52%),
    radial-gradient(circle at 88% 14%, rgba(255, 255, 255, 0.07) 0%, transparent 42%),
    ${({ theme }) => theme.palette.primary.main};
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
  opacity: ${({ hasGameStarted }) => (hasGameStarted ? '0' : '1')};
  pointer-events: ${({ hasGameStarted }) => (hasGameStarted ? 'none' : 'auto')};
  transition:
    opacity 200ms ease ${({ hasGameStarted }) => (!hasGameStarted ? '1000ms' : '0ms')};
`;

export const Decorations = styled('div')`
  position: absolute;
  inset: 0;
  border-radius: 10px;
  overflow: hidden;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    top: -70px;
    right: -70px;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.07);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 72px;
    right: 22px;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 1.5px solid rgba(255, 255, 255, 0.14);
  }
`;

export const TopSection = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const GameTitle = styled('div')`
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.5px;
`;

export const GameTagline = styled('div')`
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.01em;
`;

export const Divider = styled('div')`
  width: 32px;
  height: 2px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 2px;
  margin: 16px 0;
`;

export const RulesList = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

export const RuleItem = styled('div')`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

export const RuleNumber = styled('span')`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  color: #ccc;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
`;

export const RuleText = styled('span')`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
`;

export const PlayButton = styled('button')`
  margin-top: 20px;
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  background: #fff;
  color: ${({ theme }) => theme.palette.primary.main};
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 180ms ease;
  &:hover {
    background: #f0eef8;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

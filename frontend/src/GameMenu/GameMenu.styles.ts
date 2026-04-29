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
  background: ${({ theme }) => theme.palette.primary.main};
  opacity: ${({ hasGameStarted }) => (hasGameStarted ? '0' : '1')};
  pointer-events: ${({ hasGameStarted }) => (hasGameStarted ? 'none' : 'auto')};
  transition:
    opacity 200ms ease ${({ hasGameStarted }) => (!hasGameStarted ? '1000ms' : '0ms')};
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
  color: rgba(255, 255, 255, 0.65);
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
  color: rgba(255, 255, 255, 0.75);
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

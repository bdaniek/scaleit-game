import { styled } from '@mui/material';

export const Wrapper = styled('div')<{
  isOpened: boolean;
  hasGameStarted: boolean;
  instant?: boolean;
}>`
  width: 300px;
  height: 100%;
  position: absolute;
  top: 0;
  border-radius: 10px;
  right: ${({ isOpened }) => (isOpened ? '-320px' : '0')};
  transition: ${({ instant }) =>
    instant ? 'right 300ms ease' : 'right 300ms ease, opacity 300ms ease 1100ms'};
  z-index: 0;
  padding: 20px;
  flex-direction: column;
  gap: 16px;
  display: flex;
  opacity: ${({ hasGameStarted, instant }) => (hasGameStarted || instant ? '0' : '1')};
  pointer-events: ${({ hasGameStarted, instant }) => (hasGameStarted || instant ? 'none' : 'auto')};
  background:
    radial-gradient(circle at 90% 10%, rgba(255, 255, 255, 0.09) 0%, transparent 48%),
    radial-gradient(circle at 10% 90%, rgba(255, 255, 255, 0.06) 0%, transparent 40%),
    ${({ theme }) => theme.palette.primary.main};
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
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
    bottom: -60px;
    left: -60px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
  }

  &::after {
    content: '';
    position: absolute;
    top: 20px;
    right: 44px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1.5px solid rgba(255, 255, 255, 0.12);
  }
`;

export const Title = styled('div')`
  color: rgba(255, 255, 255, 0.75);
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1em;
  font-family: 'DM Sans', sans-serif;
  position: relative;
`;

export const GameModeOption = styled('div')<{ isHard?: boolean }>`
  background: rgba(133, 133, 133, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 12px;
  padding: 16px 18px;
  cursor: pointer;
  transition: all 180ms ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'DM Sans', sans-serif;
  position: relative;

  &:hover {
    background: ${({ isHard }) =>
      isHard ? 'rgba(252, 211, 77, 0.1)' : 'rgba(134, 239, 172, 0.1)'};
    border-color: ${({ isHard }) =>
      isHard ? 'rgba(252, 211, 77, 0.5)' : 'rgba(134, 239, 172, 0.5)'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const GameModeName = styled('span')<{ isHard?: boolean }>`
  font-size: 17px;
  font-weight: 600;
  color: ${({ isHard }) => (isHard ? '#fcd34d' : '#86efac')};
  letter-spacing: -0.2px;
`;

export const GameModeDesc = styled('span')`
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.75);
  margin-top: 4px;
  display: block;
  line-height: 1.5;
`;

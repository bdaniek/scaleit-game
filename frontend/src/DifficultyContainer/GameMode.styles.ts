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
  transition: ${({ instant }) => instant
    ? 'right 300ms ease'
    : 'right 300ms ease, opacity 300ms ease 1100ms'};
  z-index: 1;
  padding: 20px;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #d9d4ef;
  display: flex;
  opacity: ${({ hasGameStarted, instant }) => (hasGameStarted || instant ? '0' : '1')};
  pointer-events: ${({ hasGameStarted, instant }) => (hasGameStarted || instant ? 'none' : 'auto')};
`;

export const GameModeOption = styled('div')<{ isHard?: boolean }>`
  background: #fff;
  border: 1px solid #e3dff5;
  border-radius: 12px;
  padding: 16px 18px;
  cursor: pointer;
  transition: all 160ms ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'DM Sans', sans-serif;

  &:hover {
    border-color: ${({ isHard }) => (isHard ? '#c95f67' : '#2a9d7a')};
    background: ${({ isHard }) => (isHard ? '#faf0f0' : '#f0faf6')};
  }
`;

export const GameModeName = styled('span')<{ isHard?: boolean }>`
  font-size: 18px;
  font-weight: 400;
  color: ${({ isHard }) => (isHard ? '#c95f67' : '#2a9d7a')};
`;

export const GameModeDesc = styled('span')`
  font-size: 12px;
  font-weight: 300;
  color: #9b96c0;
  margin-top: 2px;
  display: block;
`;

export const Title = styled('div')`
  color: #9b96c0;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
`;

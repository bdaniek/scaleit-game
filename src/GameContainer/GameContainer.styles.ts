import { styled, keyframes } from '@mui/material';

const shake = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translate(-2px, -2px);}
  40% { transform: translateY(2px); }
  60% { transform: translate(2px, -2px); }
  80% { transform: translateY(2px); }
  100% { transform: translateX(0); }
`;

export const Wrapper = styled('div')<{ isOpened: boolean; hasGameStarted: boolean }>`
  height: 300px;
  width: ${({ hasGameStarted }) => (hasGameStarted ? '900px' : '300px')};
  border-radius: 12px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 300ms ease;
  font-family: 'DM Sans', sans-serif;
  border: 1px solid #d9d4ef;
  transform: ${({ isOpened }) => (isOpened ? 'translateX(-160px)' : 'translateX(0)')};
`;

export const Title = styled('div')`
  color: #9b96c0;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
`;

export const OptionsContainer = styled('div')<{ isOpened: boolean; hasGameStarted: boolean }>`
  width: 300px;
  height: 100%;
  position: absolute;
  top: 0;
  border-radius: 10px;
  right: ${({ isOpened }) => (isOpened ? '-320px' : '0')};
  transition: right 300ms ease;
  z-index: 1;
  padding: 20px;
  flex-direction: column;
  gap: 16px;
  display: ${({ hasGameStarted }) => (hasGameStarted ? 'none' : 'flex')};
`;

export const DifficultyOption = styled('div')<{ isHard?: boolean; isChosen: boolean }>`
  background: ${({ isChosen }) => (isChosen ? '#f5f3ff' : '#fff')};
  border: 1px solid ${({ isChosen }) => (isChosen ? '#7c6af5' : '#e3dff5')};
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

export const DifficultyName = styled('span')<{ isHard?: boolean }>`
  font-size: 18px;
  font-weight: 400;
  color: ${({ isHard }) => (isHard ? '#c95f67' : '#2a9d7a')};
`;

export const DifficultyDesc = styled('span')`
  font-size: 12px;
  font-weight: 300;
  color: #9b96c0;
  margin-top: 2px;
  display: block;
`;

export const DifficultyPill = styled('span')<{ isHard?: boolean }>`
  font-size: 11px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 20px;
  background: ${({ isHard }) => (isHard ? '#fceaea' : '#e0f5ee')};
  color: ${({ isHard }) => (isHard ? '#c95f67' : '#2a9d7a')};
`;

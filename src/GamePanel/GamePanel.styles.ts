import { keyframes, styled } from '@mui/material';

export const Wrapper = styled('div')<{ hasGameStarted: boolean; hasTimerStarted: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 98;
  opacity: ${({ hasTimerStarted }) => (hasTimerStarted ? '1' : '0')};
  transition: all 300ms ease;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0eef8;
`;

export const SliderWrapper = styled('div')<{ hasGameStarted: boolean }>`
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d9d4ef;
  border-left: none;
  position: absolute;
  right: ${({ hasGameStarted }) => (hasGameStarted ? '-50px' : '0')};
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
`;

export const Bubble = styled('div')<{ shapeSize: number }>`
  width: ${({ shapeSize }) => shapeSize}px;
  height: ${({ shapeSize }) => shapeSize}px;
  border-radius: 50%;
  background: #7c6af5;
  position: relative;
  cursor: pointer;

  &:active {
    transform: scale(0.9);
  }
`;

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

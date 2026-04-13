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
`;

export const Bubble = styled('div')<{ shapeSize: number; overflow?: number; ghost?: boolean }>`
  width: ${({ shapeSize }) => shapeSize}px;
  height: ${({ shapeSize }) => shapeSize}px;
  border-radius: 50%;
  background: #7c6af5;
  opacity: ${({ ghost }) => (ghost ? 0.4 : 1)};
  position: absolute;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;

  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    border: ${({ overflow }) => (overflow ? `${overflow / 2}px solid #f87171` : 'none')};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${({ shapeSize, overflow = 0 }) => shapeSize + overflow}px;
    height: ${({ shapeSize, overflow = 0 }) => shapeSize + overflow}px;
  }

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
  border: 1px solid #4e4880;
  color: #4e4880;
  cursor: pointer;
  transition: all 200ms ease;

  &:hover {
    background: #4e4880;
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

export const ResultScreen = styled('div')`
  width: 100%;
  height: 100%;
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled('div')`
  font-weight: 700;
  font-size: 20px;
`;

export const RoundResultItem = styled('div')``;

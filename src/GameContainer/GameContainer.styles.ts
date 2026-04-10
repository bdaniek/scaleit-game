import { styled, keyframes } from '@mui/material';

const shake = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translate(-2px, -2px);}
  40% { transform: translateY(2px); }
  60% { transform: translate(2px, -2px); }
  80% { transform: translateY(2px); }
  100% { transform: translateX(0); }
`;

export const Wrapper = styled('div')<{ isOpened: boolean; hasTimerStarted: boolean }>`
  height: ${({ hasTimerStarted }) => (hasTimerStarted ? '400px' : '300px')};
  width: ${({ hasTimerStarted }) => (hasTimerStarted ? '1100px' : '300px')};
  border-radius: 12px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'DM Sans', sans-serif;
  border: 1px solid #d9d4ef;
  transition:
    transform 300ms ease,
    width 500ms ease,
    height 500ms ease 500ms;
  transform: ${({ isOpened }) => (isOpened ? 'translateX(-160px)' : 'translateX(0)')};
`;

export const GameScreen = styled('div')<{ hasTimerStarted: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 98;
  opacity: ${({ hasTimerStarted }) => (hasTimerStarted ? '1' : '0')};
  transition: all 300ms ease;
  transition-delay: 1000ms;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rippleOut = keyframes`
  0%   { transform: translate(-50%, -50%) scale(0); opacity: 1; }
  60%  { opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
`;

export const RippleRing = styled('div')`
  position: absolute;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  border: 2px solid #7c6af5;
  pointer-events: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: ${rippleOut} 0.7s cubic-bezier(0.1, 0.4, 0.3, 1) forwards;
`;

export const Bubble = styled('div')`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #7c6af5;
  position: relative;
  cursor: pointer;
  transition: all 200ms ease;

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

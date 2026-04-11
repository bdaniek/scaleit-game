import { styled, keyframes } from '@mui/material';

export const Wrapper = styled('div')<{
  isOpened: boolean;
  hasTimerStarted: boolean;
  hasGameStarted: boolean;
}>`
  height: ${({ hasTimerStarted }) => (hasTimerStarted ? '400px' : '300px')};
  width: ${({ hasTimerStarted }) => (hasTimerStarted ? '500px' : '300px')};
  border-radius: 12px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'DM Sans', sans-serif;
  border: ${({ hasTimerStarted }) => (hasTimerStarted ? 'none' : '1px solid #d9d4ef')};
  transition:
    transform 300ms ease,
    width 500ms ease,
    height 500ms ease 500ms;
  transform: ${({ isOpened }) => (isOpened ? 'translateX(-160px)' : 'translateX(0)')};
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

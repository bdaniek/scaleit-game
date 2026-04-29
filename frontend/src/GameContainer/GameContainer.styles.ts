import { styled } from '@mui/material';

export const Wrapper = styled('div')<{
  isOpened: boolean;
  hasGameStarted: boolean;
}>`
  height: ${({ hasGameStarted }) => (hasGameStarted ? '400px' : '320px')};
  width: ${({ hasGameStarted }) => (hasGameStarted ? '500px' : '300px')};
  border-radius: 12px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'DM Sans', sans-serif;
  transition:
    transform 300ms ease,
    width 500ms ease,
    height 500ms ease 500ms;
  transform: ${({ isOpened }) => (isOpened ? 'translateX(-160px)' : 'translateX(0)')};
`;


export const Overlay = styled('div')`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: #f0eef8;
  border-radius: 12px;
  z-index: 102;
  font-family: 'DM Sans', sans-serif;
  padding: 24px;
  text-align: center;
`;

export const OverlayTitle = styled('div')`
  font-size: 18px;
  font-weight: 700;
  color: #4e4880;
`;

export const OverlayText = styled('div')`
  font-size: 14px;
  color: #9b96c0;
  line-height: 1.5;
`;

export const OverlayButton = styled('button')`
  margin-top: 8px;
  padding: 10px 24px;
  border-radius: 8px;
  border: 1px solid #7c6af5;
  background: transparent;
  color: #7c6af5;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: all 160ms ease;
  &:hover { background: #7c6af5; color: #fff; }
`;

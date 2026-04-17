import { styled } from '@mui/material';

export const Wrapper = styled('div')<{
  isOpened: boolean;
  hasGameStarted: boolean;
}>`
  height: ${({ hasGameStarted }) => (hasGameStarted ? '400px' : '300px')};
  width: ${({ hasGameStarted }) => (hasGameStarted ? '500px' : '300px')};
  border-radius: 12px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'DM Sans', sans-serif;
  border: ${({ hasGameStarted }) => (hasGameStarted ? 'none' : '1px solid #d9d4ef')};
  transition:
    transform 300ms ease,
    width 500ms ease,
    height 500ms ease 500ms;
  transform: ${({ isOpened }) => (isOpened ? 'translateX(-160px)' : 'translateX(0)')};
`;

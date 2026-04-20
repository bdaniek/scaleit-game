import { styled } from '@mui/material';

export const Wrapper = styled('div')<{ hasGameStarted: boolean }>`
  position: absolute;
  top: ${({ hasGameStarted }) => (hasGameStarted ? '-50px' : '0')};
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.palette.primary.main};
  transition: all 300ms ease;
`;

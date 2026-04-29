import { styled } from '@mui/material';

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
`;

export const Title = styled('div')`
  color: ${({ theme }) => theme.palette.primary.main};
  opacity: 0.75;
  margin: 10px;
  padding: 0 12px;
  font-size: 30px;
  font-weight: 700;
  position: absolute;
  transition: color 300ms ease;
  background: rgba(240, 238, 248, 1);
`;

export const Content = styled('div')`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

import { styled } from '@mui/material';

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
`;

export const Title = styled('div')`
  color: ${({ theme }) => theme.palette.primary.light};
  padding: 10px 30px;
  font-size: 30px;
  font-weight: 700;
  position: absolute;
  transition: color 300ms ease;
`;

export const Content = styled('div')`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;


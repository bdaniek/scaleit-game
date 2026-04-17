import { styled } from '@mui/material';

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
`;

export const Title = styled('div')`
  color: #9b96c0;
  padding: 10px 30px;
  font-size: 30px;
  font-weight: 700;
  position: absolute;
`;

export const Content = styled('div')`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;


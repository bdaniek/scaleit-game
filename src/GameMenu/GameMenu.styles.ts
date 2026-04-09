import { styled } from '@mui/material';
export const Wrapper = styled('div')<{ isOpened: boolean }>`
  height: 100%;
  width: 360px;
  position: relative;
  z-index: 2;
  transition: transform 300ms ease;
  padding: 32px 28px;
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  background: #f0eef8;
`;

export const GameMenuOptions = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0;
`;

export const GameMenuOption = styled('div')`
  width: 100%;
  border-radius: 8px;
  color: #4e4880;
  font-size: 22px;
  font-weight: 400;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 10px;
  letter-spacing: 0.01em;
  transition: all 180ms ease;
  border: 1px solid #d9d4ef;

  &:hover {
    padding-left: 20px;
    color: #4e4880;
    background: #e9e5f5;

    span {
      opacity: 1;
    }
  }
`;

export const ArrowSpan = styled('span')`
  display: block;
  position: relative;
  opacity: 0;
  color: #7c6af5;
  font-size: 18px;
  transition: opacity 180ms ease;
`;

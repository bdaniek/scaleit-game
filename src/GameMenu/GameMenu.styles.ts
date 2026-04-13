import { styled } from '@mui/material';
export const Wrapper = styled('div')<{ isOpened: boolean; hasGameStarted: boolean }>`
  width: 360px;
  height: 100%;
  position: relative;
  z-index: 99;
  transition:
    all 300ms ease,
    transform 300ms ease 500ms;
  padding: 32px 28px;
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  background: #7c6af5;
  opacity: ${({ hasGameStarted }) => (hasGameStarted ? '0' : '1')};
  transform: translateY(${({ hasGameStarted }) => (hasGameStarted ? '1000px' : '0')});
`;

export const GameMenuOptions = styled('div')<{ hasGameStarted: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0;

  transform: ${({ hasGameStarted }) => (hasGameStarted ? 'translateY(-1000px)' : 'translateY(0)')};
`;

export const GameMenuOption = styled('div')<{ hasGameStarted: boolean }>`
  width: 100%;
  border-radius: 8px;
  color: white;
  font-size: 22px;
  font-weight: 400;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 10px;
  letter-spacing: 0.01em;
  transition:
    all 180ms ease,
    transform 180ms ease 300ms;
  border: 1px solid #d9d4ef;

  transform: ${({ hasGameStarted }) => (hasGameStarted ? 'translateY(-1000px)' : 'translateY(0)')};

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
  display: flex;
  align-items: center;
  position: relative;
  opacity: 0;
  color: #7c6af5;
  transition: opacity 180ms ease;
`;

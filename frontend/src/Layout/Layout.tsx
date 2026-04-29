import { Content, Title, Wrapper } from '@/Layout/Layout.styles.ts';
import type { ReactNode } from 'react';
import DotGrid from '@/DotGrid';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Wrapper>
      <DotGrid />
      <Title>Glimpse</Title>
      <Content>{children}</Content>
    </Wrapper>
  );
};
export default Layout;

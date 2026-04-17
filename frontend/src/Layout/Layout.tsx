import { Title, Wrapper, Content } from '@/Layout/Layout.styles.ts';
import type { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Wrapper>
      <Title>ScaleIt</Title>
      <Content>{children}</Content>
    </Wrapper>
  );
};
export default Layout;

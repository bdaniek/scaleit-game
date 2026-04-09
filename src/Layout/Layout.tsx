import { Footer, Title, Wrapper, Content } from './Layout.styles.ts';
import type { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Wrapper>
      <Title>unnamed rhythm game</Title>
      <Content>{children}</Content>
      <Footer>Bartosz Daniek</Footer>
    </Wrapper>
  );
};
export default Layout;

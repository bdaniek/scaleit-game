import { CssBaseline } from '@mui/material';
import { createGlobalStyle } from 'styled-components';
import Layout from '@/Layout/Layout.tsx';
import GameContainer from '@/GameContainer/GameContainer.tsx';

function App() {
  return (
    <>
      <CssBaseline />
      <GlobalStyle />
      <Layout>
        <GameContainer></GameContainer>
      </Layout>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    background: #f0eef8;
    font-family: 'DM Sans', sans-serif;
  }
`;

import { useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme, lighten } from '@mui/material/styles';
import { createGlobalStyle } from 'styled-components';
import Layout from '@/Layout/Layout.tsx';
import GameContainer from '@/GameContainer/GameContainer.tsx';
import { ThemeColorContext } from '@/context/gameTheme';
import { randomColor } from '@/GamePanel/shapes';

function App() {
  const [themeColor, setThemeColor] = useState(randomColor);
  
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: themeColor,
            light: lighten(themeColor, 0.65),
            dark: themeColor,
          },
        },
      }),
    [themeColor],
  );

  return (
    <ThemeColorContext.Provider value={setThemeColor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyle />
        <Layout>
          <GameContainer />
        </Layout>
      </ThemeProvider>
    </ThemeColorContext.Provider>
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

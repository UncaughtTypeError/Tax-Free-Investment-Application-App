import React, { useMemo } from 'react';
// Components
import Body from './containers/Body';
import Header from './presentational/Header';
import Wrapper from './presentational/Wrapper';
// Theme
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
      () =>
          createMuiTheme({
              palette: {
                  type: prefersDarkMode ? 'dark' : 'light',
                  primary: {
                      main: '#aa1111',
                  },
              },
          }),
      [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Body>
        <Header />
        <Wrapper />
      </Body>
    </ThemeProvider>
  );
}

export default App;

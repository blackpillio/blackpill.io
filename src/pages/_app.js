import { ThemeProvider } from 'theme-ui';
import theme from '../theme';

import '../styles/style.css';

function MyApp({ Component, pageProps }) {
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

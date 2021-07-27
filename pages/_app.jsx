/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, ThemeProvider } from '@emotion/react';

import { globalStyles } from '../styles/Styles';
import theme from '../styles/theme';

const MyApp = ({ Component, pageProps }) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <ThemeProvider theme={theme}>
      {globalStyles}
      <Component {...pageProps} />
    </ThemeProvider>,
  );
};

export default MyApp;

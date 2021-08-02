import { ThemeProvider } from '@emotion/react';

import 'antd/dist/antd.css';
import { globalStyles } from '../styles/styles';
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

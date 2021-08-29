import { useEffect, useState } from 'react';

import { ThemeProvider } from '@emotion/react';
import { Context as ResponsiveContext } from 'react-responsive';
import 'antd/dist/antd.css';

import { globalStyles } from '../styles/styles';
import theme from '../styles/theme';

// to test if we are on server or client, use useEffect instead of testing typeof window
// see issue: https://github.com/contra/react-responsive/issues/257
const MyApp = ({ Component, pageProps }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  const mainApp = (
    <ThemeProvider theme={theme}>
      {globalStyles}
      <Component {...pageProps} />
    </ThemeProvider>
  );

  return getLayout(
    isClient
    ? mainApp
    : (
      // force the device width to 800 when rendered server side
      <ResponsiveContext.Provider value={{ width: 800 }}>
        {mainApp}
      </ResponsiveContext.Provider>
    ),
  );
};

export default MyApp;

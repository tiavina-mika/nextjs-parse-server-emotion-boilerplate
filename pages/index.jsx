import Head from 'next/head';

import { mq } from '../styles/styles';

const styles = {
  container: (theme) => mq({
    backgroundColor: ['green', 'red', 'hotpink', 'blue'],
    color: theme.colors.primary,
  }),
  size: {
    height: 200,
  },
};

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <div css={(theme) => ({ color: theme.colors.primary })}>
          some other text
        </div> */}
        <div css={[styles.container, styles.size]}>
          Some text.
        </div>
      </main>
    </div>
  );
}

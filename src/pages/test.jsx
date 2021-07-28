import Head from 'next/head';

import { mq } from '../styles/styles';

const styles = {
  container: (theme) => mq({
    backgroundColor: ['green', false, 'hotpink', 'blue'], // green, green, hotpink, blue
    color: theme.colors.primary,
  }),
  size: ({ size }) => ({
    height: size,
  }),
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
        <div css={[styles.container, styles.size({ size: 400 })]}>
          Some text.
        </div>
      </main>
    </div>
  );
}

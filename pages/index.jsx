import { css } from '@emotion/react';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div css={(theme) => ({ color: theme.colors.primary })}>
          some other text
        </div>
      </main>
    </div>
  );
}

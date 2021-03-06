import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { AppProps } from 'next/app';
import { getCookie, setCookies } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { RecoilRoot } from 'recoil';
import { FuegoProvider } from 'swr-firestore-v9';
import Layout from '@/components/layout/Layout';
import { fuego } from '@/firebase/config';

import '@/styles/globals.css';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>XGYM Manager</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme="dark" toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{ colorScheme: 'dark', fontFamily: 'Inter, sans-serif' }}
          withGlobalStyles
          withNormalizeCSS
          emotionOptions={{ key: 'mantine', prepend: false }}
        >
          <RecoilRoot>
            <NotificationsProvider>
              <FuegoProvider fuego={fuego}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </FuegoProvider>
            </NotificationsProvider>
          </RecoilRoot>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});

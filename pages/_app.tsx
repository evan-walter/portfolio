import Head from 'next/head'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from 'components/Navbar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Evan Walter | Full Stack Engineering</title>
        <meta
          name='description'
          content='React | Next.js | Node.js | TypeScript | GraphQL'
        />
        <link rel='icon' href='/favicon.svg' />
      </Head>

      <div className='container relative mx-auto px-4'>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </>
  )
}

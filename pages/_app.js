import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return <>
    <Head>
    <meta name="viewport" content="width=device-width , initial-scale=1.0 , minimum-scale=1.0"/>
    </Head>
    <Navbar />
    <Component {...pageProps} />
    <Footer />
  </>
}

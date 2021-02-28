import Header from '@/components/Header'
import '@/styles/globals.css'
import '@/styles/typography.css'
import '@/styles/variables.css'
import Head from 'next/head'
import React, { ReactNode } from 'react'

const app = ({ Component, pageProps }): ReactNode => (
    <>
        <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet" />
            {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
            <script defer src="https://www.googletagmanager.com/gtag/js?id=UA-61523435-6"></script>
            <script defer src="/ga.js"></script>
        </Head>

        <Header></Header>
        <Component {...pageProps} />
    </>
)

export default app

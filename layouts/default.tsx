import Head from 'next/head'
import React, { ReactNode } from 'react'

interface Props {
    title: string
    description: string
    children: ReactNode
}

const DefaultLayout = ({ title, description, children }: Props) => (
    <>
        <Head>
            <title>{title} | Official site of Justin Taddei</title>
            <meta name="description" content={description} />
        </Head>
        <div>{children}</div>
    </>
)

export default DefaultLayout

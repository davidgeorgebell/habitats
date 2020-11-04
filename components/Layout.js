import React from 'react'
import Head from 'next/head'


export const Layout = ({ title, children }) => {
    return (
        <div className='min-h-full'>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='container mx-auto max-w-5xl px-4 pt-24'>
                {children}
            </main>
        </div>
    );
}
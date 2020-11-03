import React from 'react'
import Head from 'next/head'

interface LayoutProps {
    title: string
}

export const Layout: React.FC<LayoutProps> = ({ title, children }) => {
    return (
        <div className='bg-gray-300'>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='container mx-auto max-w-4xl px-4'>
                {children}
            </main>
        </div>
    );
}
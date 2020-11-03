import React from 'react'
import Head from 'next/head'

interface LayoutProps {
    title: string
}

export const Layout: React.FC<LayoutProps> = ({ title, children }) => {
    return (
        <div className='min-h-full'>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {children}
        </div>
    );
}
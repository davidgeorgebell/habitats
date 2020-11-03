import React from 'react'

export const Header = ({ handleSearchFilter }) => {
    return (
        <header className='flex bg-white border-b border-gray-200 fixed top-0 inset-x-0 z-100 h-24 items-center'>
            <form className='mx-auto container max-w-2xl px-4'>
                <input className='w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-24' placeholder='Search for country name or region' type='text' onChange={handleSearchFilter} />
            </form>
        </header>
    )
}

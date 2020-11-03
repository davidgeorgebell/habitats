import React from 'react'

import { CountryCard } from './CountryCard'


export const CountryList = ({ searchedCountries }) => {
    return (
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
                searchedCountries.map(country =>
                    <CountryCard country={country} />
                )
            }
        </ul>
    )
}

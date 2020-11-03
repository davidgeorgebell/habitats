import React from 'react'
import Link from 'next/link'

export const CountryCard = ({ country }) => {
    return (
        <>
            <li className='bg-white py-4 rounded' key={country.name}>
                <Link href={`/country/[slug]`} as={`country/${country.alpha3Code}`}>
                    <a>
                        <div>
                            <img className='object-cover h-48 w-full rounded shadow-2xl' src={country.flag} alt={`Flag for ${country.name}`} />
                        </div>
                        <div className=''>
                            <h3 className='py-4 text-3xl leading-snug'>{country.name}</h3>
                            {country.capital && <p className='text-lg leading-relaxed'><span className='font-bold'>Capital:</span> {country.capital}</p>}
                            <p className='text-lg leading-relaxed'><span className='font-bold'>Region:</span>
                                {' '}{country.region}</p>
                        </div>

                    </a>
                </Link>
            </li>
        </>
    )
}

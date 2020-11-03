import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { Layout } from '../components/Layout'

export const regions = [
  { region: 'africa' }, { region: 'asia' }, { region: 'america' }, { region: 'europe' }, { region: 'oceania' }
]

const Home = ({ allCountries }) => {
  const [searchFilter, setSearchFilter] = useState('')

  const handleSearchFilter = e => setSearchFilter(e.target.value)

  const handleRegionFilter = region => setSearchFilter(region)

  const searchedCountries = allCountries.filter(country => country.name.toLowerCase().includes(searchFilter) || country.region.toLowerCase().includes(searchFilter))

  return (
    <Layout title="All Countries">
      <header className='flex bg-white border-b border-gray-200 fixed top-0 inset-x-0 z-100 h-24 items-center'>
        <form className='mx-auto container max-w-2xl'>
          <input className='w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-24' placeholder='Search for country name or region' type='text' onChange={handleSearchFilter} />
        </form>
      </header>
      <main className='container mx-auto max-w-4xl px-4 pt-24'>
        <div className='py-10'>
          <h1 className='text-center font-bold text-2xl md:text-4xl lg:text-5xl pt-6 pb-8'>Habitats</h1>
          <ul className='flex flex-wrap justify-center'>
            {regions.map(r => <li key={r.region}><button className='my-2 mx-1 text-white font-bold py-2 px-4 rounded bg-teal-500 hover:bg-teal-600' onClick={() => handleRegionFilter(r.region)}>#{r.region}</button></li>)}
          </ul>
        </div>
        <h3 className='text-4xl pr-10 uppercase'>{searchFilter.length ? searchFilter : 'All'}</h3>
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {
            searchedCountries.map(country =>
              <li className='bg-white py-4 rounded' key={country.name}>
                <Link href={`/country/[slug]`} as={`country/${country.alpha3Code}`}>
                  <a>
                    <div>
                      <img className='object-cover h-48 w-full rounded shadow-2xl' src={country.flag} alt={`Flag for ${country.name}`} />
                    </div>
                    <div className=''>
                      <h3 className='py-4 text-3xl leading-snug'>{country.name}</h3>
                      <p className='text-lg leading-relaxed'><span className='font-bold'>Capital:</span> {country.capital}</p>
                      <p className='text-lg leading-relaxed'><span className='font-bold'>Region:</span>
                        {' '}{country.region}</p>
                    </div>

                  </a>
                </Link>
              </li>)
          }
        </ul>
      </main>

    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch('https://restcountries.eu/rest/v2/all')
    const allCountries = await res.json()
    return {
      props: {
        allCountries
      }
    }
  } catch (err) {
    console.error(err)
  }
}


export default Home;
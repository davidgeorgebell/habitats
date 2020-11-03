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

      <h1 className='font-bold text-4xl md:text-5xl lg:text-6xl pt-6 pb-8'>Habitats</h1>
      <main>
        <div className='py-10'>
          <form className='max-w-md mb-10'>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-24' placeholder='Search for country name or region' type='text' onChange={handleSearchFilter} />
          </form>
          <ul className='flex flex-wrap'>
            {regions.map(r => <li key={r.region}><button className='my-2 mx-1 text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700' onClick={() => handleRegionFilter(r.region)}># {r.region}</button></li>)}
          </ul>
        </div>
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {
            searchedCountries.map(country => <li key={country.name}>
              <Link href={`/country/[slug]`} as={`country/${country.alpha3Code}`}>
                <a><h3>{country.name}</h3></a>
              </Link>
              <div>
                <img className='object-cover h-48 w-full' src={country.flag} alt={`Flag for ${country.name}`} />
              </div>
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
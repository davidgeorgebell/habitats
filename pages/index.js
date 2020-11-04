import { GetStaticProps } from 'next'

import { useState } from 'react'

import { Layout } from '../components/Layout'
import { CountryList } from '../components/CountryList'
import { RegionList } from '../components/RegionList'
import { Header } from '../components/Header'


const Home = ({ allCountries }) => {
  const [searchFilter, setSearchFilter] = useState('')


  const handleSearchFilter = e => setSearchFilter(e.target.value)

  const handleRegionFilter = region => setSearchFilter(region)

  const searchedCountries = allCountries.filter(country => country.name.toLowerCase().includes(searchFilter) || country.region.toLowerCase().includes(searchFilter))

  const [capitalCityWeather, setCapitalCityWeather] = useState(null)

  useEffect(() => {
    const getWeather = async () => {
      try {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${countryData.capital}&units=metric&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`)
        const weather = await res.json()
        setCapitalCityWeather(weather)
      } catch (err) {
        console.error(err)
      }
    }
    getWeather()
  }, [])


  return (
    <>
      <Header handleSearchFilter={handleSearchFilter} />
      <Layout title="All Countries">
        <div className='py-10'>
          <h1 className='text-center font-bold text-2xl md:text-4xl lg:text-5xl pt-6 pb-8'>Habitats</h1>
          <RegionList handleRegionFilter={handleRegionFilter} />
        </div>
        <h3 className='font-mono text-xl pr-10'>Displaying: {searchFilter.length ? searchFilter : 'All'}</h3>
        <CountryList searchedCountries={searchedCountries} />
      </Layout>
    </>
  )
}


export const getStaticProps = async () => {
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
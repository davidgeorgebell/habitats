import Link from "next/link"
import { useState, useEffect } from "react"

import { Layout } from "../../components/Layout"
import { Weather } from '../../components/Weather.js'


const Country = ({ countryData }) => {
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
        <Layout title={countryData.name}>
            <div className='pb-10'>
                <Link href='/'>
                    <a>
                        <button className='my-2 mx-1 text-white font-bold py-2 px-4 rounded bg-teal-500 hover:bg-teal-600'>Back</button>
                    </a>
                </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='w-full'>
                    <img className='object-cover rounded shadow-2xl' src={countryData.flag} alt={`Flag for ${countryData.name}`} />
                </div>
                <div>
                    <h2 className='pb-2 text-4xl leading-snug'>{countryData.name}</h2>
                    {countryData.capital && <h3><span className='font-bold'>Capital city:</span> {countryData.capital}</h3>}
                    {countryData.region && <h4><span className='font-bold'>Region:</span> {countryData.region}</h4>}
                    {countryData.languages &&
                        <>
                            <h4 className='py-1 text-lg leading-snug font-bold'>Languages</h4>
                            <ul className='flex flex-wrap'>
                                {
                                    countryData.languages.map(l => <li className='m-1 px-2 py-1 rounded shadow bg-gray-300' key={l.name}>{l.name} </li>)
                                }
                            </ul>
                        </>
                    }
                    {countryData.currencies &&
                        <>
                            <h4 className='py-1 text-lg leading-snug font-bold'>Currencies</h4>
                            <ul className='flex flex-wrap'>
                                {
                                    countryData.currencies.map(c => c.name && <li className='m-1' key={c.name}>
                                        {c.name}{' '}
                                        {c.symbol && <span className='py-1 px-2 shadow font-bold bg-gray-300 rounded'>{c.symbol}</span>}
                                    </li>
                                    )
                                }
                            </ul>
                        </>
                    }
                </div>
            </div>
            {capitalCityWeather && capitalCityWeather.weather && capitalCityWeather.main ?
                <Weather capitalCityWeather={capitalCityWeather} countryData={countryData} />
                : null
            }

        </Layout>
    )
}


export const getStaticPaths = async () => {
    try {
        const res = await fetch('https://restcountries.eu/rest/v2/all')
        const json = await res.json()
        const paths = await json.map(c => {
            return {
                params: {
                    slug: c.alpha3Code
                }
            }
        })
        return {
            paths,
            fallback: false
        }
    } catch (err) {
        console.error(err)
    }
}

export const getStaticProps = async ({ params }) => {
    try {
        const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${params.slug}`)
        const countryData = await res.json()

        return {
            props: {
                countryData
            }
        }
    } catch (err) {
        console.error(err)
    }
}

export default Country
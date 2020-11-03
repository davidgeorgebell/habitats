import { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Layout } from "../../components/Layout"



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
            <Link href='/'>
                <a>
                    <button className='my-2 mx-1 text-white font-bold py-2 px-4 rounded bg-teal-500 hover:bg-teal-600'>Back</button>
                </a>
            </Link>
            <h2>{countryData.name}</h2>
            {countryData.capital && <h3>Caital city: {countryData.capital}</h3>}
            {countryData.region && <h4>Region: {countryData.region}</h4>}
            <img src={countryData.flag} alt={`Flag for ${countryData.name}`} width='300' height='200' />
            {countryData.languages &&
                <ul>
                    <h4>Languages</h4>
                    {
                        countryData.languages.map(l => <li key={l.name}>{l.name} </li>)
                    }
                </ul>
            }
            {countryData.currencies &&
                <ul>
                    <h4>Currency</h4>
                    {
                        countryData.currencies.map(c => c.name && <li key={c.name}>
                            {c.name}{' '}
                            <span>{c.symbol}</span>
                        </li>
                        )
                    }
                </ul>
            }

            {capitalCityWeather && capitalCityWeather.weather && capitalCityWeather.main ?
                <div>
                    <h3>Weather</h3>
                    <ul>
                        <li>Type: {capitalCityWeather.weather[0].main}</li>
                        <li>Main: {Math.round(capitalCityWeather.main.temp)}<span>ºC</span></li>
                        <li>Feels like: {Math.round(capitalCityWeather.main.feels_like)}<span>ºC</span></li>
                        <li>Low: {Math.round(capitalCityWeather.main.temp_min)}<span>ºC</span></li>
                        <li>High: {Math.round(capitalCityWeather.main.temp_max)}<span>ºC</span></li>
                    </ul>
                </div>
                : null
            }
        </Layout>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${params.slug as string}`)
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
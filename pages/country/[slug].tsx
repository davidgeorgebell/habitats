import { GetStaticPaths, GetStaticProps } from "next"
import { useState, useEffect } from "react"
import { Layout } from "../../components/Layout"

const Country = ({ countryData }) => {
    const [capitalCityWeather, setCapitalCityWeather] = useState([])

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
            <h2>{countryData.name}</h2>
            <h4>{countryData.region}</h4>
            <img src={countryData.flag} alt={`Flag for ${countryData.name}`} width='300' height='200' />
            <ul>
                <h4>Languages</h4>
                {
                    countryData.languages.map(l => <li key={l.name}>{l.name} </li>)
                }
            </ul>
            <ul>
                <h4>Currency</h4>
                {
                    countryData.currencies.map(c => c.name && <li key={c.name}>
                        {c.name}{' '}
                        <span>{c.symbol}</span>
                    </li>)
                }
            </ul>
            <div>
                <h3>Weather</h3>
                {capitalCityWeather &&
                    JSON.stringify(capitalCityWeather)
                }
            </div>
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
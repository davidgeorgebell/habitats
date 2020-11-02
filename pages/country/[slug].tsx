import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import { Layout } from "../../components/Layout"



const Country = ({ countryData }) => {
    return (
        // TODO make title dynaminc
        <Layout title={countryData.name}>
            <h2>{countryData.name}</h2>
            <h4>{countryData.region}</h4>
            <img src={countryData.flag} alt={`Flag for ${countryData.name}`} width='300' height='200' />
            <ul>
                <h4>Languages</h4>
                {
                    countryData.languages.map(l => <li>{l.name} </li>)
                }
            </ul>
            <ul>
                <h4>Currency</h4>
                {
                    countryData.currencies.map(c => c.name && <li>
                        {c.name}{' '}
                        <span>{c.symbol}</span>
                    </li>)
                }
            </ul>
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

        console.log(countryData)

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
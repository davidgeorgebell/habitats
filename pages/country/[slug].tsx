import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import { Layout } from "../../components/Layout"

interface CountryProps {
    name: string
}

const Country = ({ countryData }: {
    countryData: {
        name: string
    }
}) => {
    return (
        // TODO make title dynaminc
        <Layout title={countryData.name}>
            {
                <h2>{countryData.name}</h2>
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
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { Layout } from '../components/Layout'



const Home = ({ allCountries }) => {
  return (
    <Layout title="All Countries">

      <h1>Habitats</h1>
      <main>
        <ul>
          {
            allCountries.map(country => <li key={country.name}>
              <Link href={`/country/[slug]`} as={`country/${country.alpha3Code}`}>
                <a><h3>{country.name}</h3></a>
              </Link>
              <img src={country.flag} alt={`Flag for ${country.name}`} width='300' height='200' />
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
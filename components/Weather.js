import React from 'react'

export const Weather = ({ capitalCityWeather, countryData }) => {
    return (

        <>
            <div className={`${capitalCityWeather.main.temp >= 30 ? 'bg-red-700'
                :
                capitalCityWeather.main.temp >= 20 ? 'bg-red-600'
                    :
                    capitalCityWeather.main.temp >= 15 ? 'bg-orange-600'
                        :
                        capitalCityWeather.main.temp >= 10 ? 'bg-blue-300'
                            : 'bg-blue-100'

                } rounded shadow-2xl my-10 py-10`}>

                {countryData && <h3 className='text-3xl text-center leading-snug'>Current weather in {countryData.capital}</h3>}
                <ul className='flex flex-wrap justify-center'>
                    <li className='bg-white p-4 m-4 rounded shadow text-4xl font-bold flex flex-col justify-center align-center'>{capitalCityWeather.weather[0].main}</li>
                    <li className='flex flex-col bg-white p-4 m-4 rounded shadow'>Main: <span className='text-4xl font-bold'>{Math.round(capitalCityWeather.main.temp)}<span>ºC</span></span></li>
                    <li className='flex flex-col bg-white p-4 m-4 rounded shadow'>Feels like: <span className='text-4xl font-bold'>{Math.round(capitalCityWeather.main.feels_like)}<span>ºC</span></span></li>
                    <li className='flex flex-col bg-white p-4 m-4 rounded shadow'>Low: <span className='text-4xl font-bold'>{Math.round(capitalCityWeather.main.temp_min)}<span>ºC</span></span></li>
                    <li className='flex flex-col bg-white p-4 m-4 rounded shadow'>High: <span className='text-4xl font-bold'>{Math.round(capitalCityWeather.main.temp_max)}<span>ºC</span></span></li>
                </ul>
            </div>
        </>



    )
}

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import moment from 'moment-timezone'

const CountryCard = () => {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [currentTime, setCurrentTime] = useState(null)
  const [isPaused, setIsPaused] = useState(false)
  let navigate = useNavigate()
  useEffect(() => {
    axios
      .get('http://worldtimeapi.org/api/timezone')
      .then(response => {
        setCountries(response.data)
        setSelectedCountry(response.data[0])
        updateTime(response.data[0])
      })
      .catch(error => console.error('Error fetching countries:', error))
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused) {
        setCurrentTime(prevTime => moment(prevTime).add(1, 'second'))
      }
    }, 1000)

    return () => clearInterval(intervalId) // Cleanup on component unmount
  }, [isPaused])

  const updateTime = country => {
    if (country) {
      axios
        .get(`http://worldtimeapi.org/api/timezone/${country}`)
        .then(response => {
          setCurrentTime(moment(response.data.utc_datetime).tz(country))
        })
        .catch(error => console.error('Error fetching current time:', error))
    }
  }

  const handleCountryChange = event => {
    setSelectedCountry(event.target.value)
    updateTime(event.target.value)
    // setIsPaused(false);
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  return (
    <div className='country-clock-container'>
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      <div className='flex-container'>
        <div id='profile-header'>
          <select
            id='country-selector'
            onChange={handleCountryChange}
            value={selectedCountry}
          >
            {countries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        {currentTime && (
          <div className='clock-container'>
            <span>{moment(currentTime).format('hh:mm:ss')}</span>
          </div>
        )}
        <div>
          <button id='start-pause-btn' onClick={togglePause}>
            {isPaused ? 'Start' : 'Pause'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CountryCard

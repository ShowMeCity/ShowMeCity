import React, { useState, useEffect } from "react";
import { fetchData } from "../request/fetchData";

export default function CountrySelector({ updatePlay }) {
  const [countries, setCountries] = useState([]);

  useEffect( () => async () =>{
    const response = await fetchData();
    const data = response.data;

    const countryKey= Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)]
    const cityKey= Object.keys(data[countryKey].city)[Math.floor(Math.random() * Object.keys(data[countryKey].city).length)]
    updatePlay(data[countryKey].city[cityKey][0]);
    setCountries(data);
  }, []);
  

  function createFlag(country) {
    return `https://flagsapi.com/${country}/flat/16.png`;
  }

  return (
    <div className="list-swap" id="list-swap">
      <ul id="ul-list">
        {Object.keys(countries).map((country, index) => (
          <li key={index}>
            <details>
              <summary>
                {countries[country].country} <img src={createFlag(country)} alt={countries[country].country} />
              </summary>
              {Object.keys(countries[country].city).map((city, index) => (
                <div key={index} htmlFor={city} className="city-list">
                  <input
                    type="radio"
                    name="city"
                    id={city}
                    onChange={() => {
                      updatePlay(countries[country].city[city][0]);
                    }}
                  />
                  <label htmlFor={city}>{city}</label>
                </div>
              ))}
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
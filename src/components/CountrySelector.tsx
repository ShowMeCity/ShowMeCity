import React, { useContext, useEffect, useMemo, useRef } from "react";
import { apiDatas, playBackSignal, videoSignal } from "../App";
import { computed } from "@preact/signals-react";
import { VideoInterface } from "@/state/AppInteface";

const CountrySelector = () => {
    const selectOption = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        if (selectOption.current) {
            selectOption.current.value = videoSignal.value[0].city;
        }
    }, [selectOption.current]);

    return (
        <div style={select_holder_styles}>
            <select ref={selectOption} id="country_selector" style={select_styles} onChange={handleSelectChange}>
                {apiDatas.value.map(({ country, cities }: any, index: number) => (
                    <optgroup key={index} label={country}>
                        {cities.map(({ city }: any, index: number) => (
                            <option key={index} value={city} data-country={country}>
                                {city}
                            </option>
                        ))}
                    </optgroup>
                ))}
            </select>
        </div>
    );
};

const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.selectedOptions[0].dataset.country!;
    const city = e.target.value;
    playBackSignal.value = 1;
    videoSignal.value = [{
        ...getComputedVideoSignal.value,
        city: city,
        country: country,
        currentVideoId: getRandomVideoIdByCountryAndCity(country, city),
        radios: getRadio(country)
    }];
};

const getComputedVideoSignal = computed(() => videoSignal.value);

const getRadio = (country: string) => {
    const countryData = getComputedApiData.value.find(data => data.country === country);
    return countryData?.radios.length === 0 ? [{ stationName: "No Radio", src: "" }] : countryData?.radios || [{ stationName: "No Radio", src: "" }];
};

const getRandomVideoIdByCountryAndCity = (country: string, city: string) => {
    const countryCityData = getComputedApiData.value.find(data => data.country === country)?.cities.find(cityData => cityData.city === city);
    return countryCityData?.orginalUrl[Math.floor(Math.random() * (countryCityData?.orginalUrl.length || 1))] || "";
};

const getComputedApiData = computed(() => apiDatas.value);

const select_holder_styles: React.CSSProperties = {
    width: '100%',
};

const select_styles: React.CSSProperties = {
    width: '100%',
    height: '40px',
    borderRadius: '2px',
    marginBottom: '10px',
    border: 'none',
    paddingLeft: '5px',
    backgroundColor: 'rgba(255,255,255,0.3)',
    color: 'white',
};

export default CountrySelector;

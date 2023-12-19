import React, { useEffect, useRef } from "react";
import { MyContextProps, radioInterface } from "../state/AppInteface";
import { MainStateContext } from "../App";
import { useContext } from "react";



const CountrySelector = () => {
    const { appState, updateState, apiDatas }: MyContextProps = useContext(MainStateContext)!;
    const selectOption = useRef<HTMLSelectElement>(null);
    useEffect(() => {
        selectOption.current!.value = appState.currentCity;
    }, [selectOption.current]);

    const select_holder_styles: React.CSSProperties = {
        width: '100%',
    }

    const select_styles: React.CSSProperties = {
        width: '100%',
        height: '40px',
        borderRadius: '2px',
        marginBottom: '10px',
        border: 'none',
        paddingLeft: '5px',
        backgroundColor: 'rgba(255,255,255,0.3)',
        color: 'white',
    }
    const onOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCity = e.target.value;

        const foundCity = apiDatas
            .flatMap((country) => country.cities.map((city) => ({ ...city, country: country.country, radios: country.radios })))
            .find((city) => city.city === selectedCity);
        if (foundCity) {
            const { city, orginalUrl, country, radios } = foundCity;
            onOptionClick(city, country, orginalUrl[Math.random() * orginalUrl.length | 0], radios);
        }
    };

    const onOptionClick = (city: string, country: string, orginalUrl: string, radios: radioInterface[]) => {
        updateState((prev) => ({
            ...prev,
            currentCity: city,
            currentCountry: country,
            currentVideoId: orginalUrl,
            isLoading: true,
            isPlaying: false,
            playBackRate: 1,
            radios: radios,
        }));
    };

    console.log("CountrySelector Rendered");

    return (
        <div style={select_holder_styles} >
            <select ref={selectOption} id="country_selector" style={select_styles} onChange={onOptionChange} >
                {
                    apiDatas.map((country: any, index: number) => {
                        return (
                            <optgroup key={index} label={country.country}>{
                                country.cities.map((city: any, index: number) => {
                                    return (
                                        <option key={index} value={city.city} >{city.city}</option>
                                    );
                                })
                            }</optgroup>
                        );
                    })

                }

            </select>
        </div>
    );
}

export default CountrySelector;

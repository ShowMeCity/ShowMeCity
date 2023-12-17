import React from "react";

const CountrySelector = () => {
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
    return (
        <div style={select_holder_styles} >
            <select id="country_selector" style={select_styles} >
                <optgroup label="United State of America">
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="New York">New York</option>
                    <option value="Chicago">Chicago</option>
                </optgroup>
                <optgroup label="United Kingdom">
                    <option value="London">London</option>
                    <option value="Manchester">Manchester</option>
                    <option value="Liverpool">Liverpool</option>
                </optgroup>
                <optgroup label="Canada">
                    <option value="Toronto">Toronto</option>
                    <option value="Vancouver">Vancouver</option>
                    <option value="Montreal">Montreal</option>
                </optgroup>
            </select>
        </div>
    );
}

export default CountrySelector;

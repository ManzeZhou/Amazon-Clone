import React, { useState } from 'react';
import axios from 'axios';
import './AddressAutocomplete.css';

const AddressAutocomplete = ({setAddress, address}) => {

    // const [address, setAddress] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const fetchAddressSuggestions = async (input) => {
        try {
            const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(input)}&key=${process.env.REACT_APP_OPENCAGE_KEY}&limit=5&language=en`
            );
            const { results } = response.data;
            const addressSuggestions = results.map((result) => result.formatted);
            setSuggestions(addressSuggestions);
        } catch (error) {
            console.error('Error fetching address suggestions:', error);
        }
    };

    const handleInputChange = (event) => {
        const input = event.target.value;
        setAddress(input);
        fetchAddressSuggestions(input);
    };

    const handleSuggestionClick = (suggestion) => {
        setAddress(suggestion);
        setSuggestions([]);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label
                htmlFor="address"
                style={{marginBottom: '5px', fontWeight: "bold"}}
            >Address:</label>
            <input
                type="text"
                id="address"
                value={address}
                onChange={handleInputChange}
                style={{padding: '8px', borderWidth:'1px', border: 'solid', borderColor: "lightgray", borderRadius: '4px', marginBottom:'10px'}}
            />
            {suggestions.length > 0 && (
                <ul
                    className="suggestion-list"
                    style={{listStyleType:"none"}}
                >
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion}
                            onClick={() => handleSuggestionClick(suggestion)}
                            style={{padding:'5px', cursor: 'pointer'}}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddressAutocomplete;
